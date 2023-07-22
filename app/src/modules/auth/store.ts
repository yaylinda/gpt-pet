import {Alert, Platform} from 'react-native';
import {create} from 'zustand';
import {DUPLICATE_EMAIL, DUPLICATE_USERNAME, INVALID_LOGIN} from '@common/constants;
import useUserStore from '@/store';
import {supabase} from '@/supabase';
import {errorAlert} from '@/utils';
import * as Burnt from 'burnt';

interface AuthStoreStateData {
    signingIn: boolean;
}

interface AuthStoreStateFunctions {
    signInWithEmailPassword: (emailOrUsername: string, password: string, firstSignIn?: boolean) => void;
    signUpWithEmailPassword: (
        email: string,
        password: string,
        username: string,
        discriminator: string
    ) => void;
    signOut: () => void;
}

type AuthStoreState = AuthStoreStateData & AuthStoreStateFunctions;

const DEFAULT_DATA: AuthStoreStateData = {
    signingIn: false,
};

const useAuthStore = create<AuthStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    signInWithEmailPassword: async (email: string, password: string, firstSignIn= false) => {
        set({ signingIn: true });

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password,
        });

        set({ signingIn: false });

        if (error) {
            switch (error.message) {
            case INVALID_LOGIN:
                Alert.alert(
                    'Invalid Login',
                    'Email and/or password are incorrect.',
                );
                break;
            default:
                errorAlert(error);
                break;
            }
            return;
        }

        Burnt.toast({
            title: firstSignIn ? 'Welcome!' : 'Welcome back!',
            preset: 'done',
            haptic: 'success',
            from: 'top'
        });
    },

    signUpWithEmailPassword: async (
        email: string,
        password: string,
        username: string,
        discriminator: string
    ) => {
        set({ signingIn: true });

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    discriminator,
                    platform: Platform.OS,
                },
            },
        });

        // triggers handle_new_user to insert profiles

        if (error) {
            set({ signingIn: false });
            switch (error.message) {
            case DUPLICATE_EMAIL:
                Alert.alert(
                    'Duplicate Email',
                    'This email address has already been registered.'
                );
                break;
            case DUPLICATE_USERNAME:
                Alert.alert(
                    'Duplicate User',
                    `User '${username}#${discriminator}' already exists.`
                );
                break;
            default:
                errorAlert(error);
                break;
            }
            return;
        }

        get().signInWithEmailPassword(email, password);
    },

    signOut: () => {
        supabase.auth.signOut();
        useUserStore.getState().setUserId('');
        set({
            ...DEFAULT_DATA,
        });
    },
}));

export default useAuthStore;
