import {errorToast} from '@common/alerts';
import {AuthStackNavigationProps} from '@nav/AuthStackNavigator';
import {Alert, Platform} from 'react-native';
import {create} from 'zustand';
import {DUPLICATE_EMAIL, DUPLICATE_USERNAME, INVALID_LOGIN} from '@/common/errors';
import useUserStore from '@/store';
import {supabase} from '@/supabase';
import * as Burnt from 'burnt';

interface AuthStoreStateData {
    signingIn: boolean;
    isLogin: boolean;
}

interface AuthStoreStateFunctions {
    signInWithEmailPassword: (email: string, password: string) => void;
    signUpWithEmailPassword: (email: string, password: string) => void;
    navSignUp: (navigation: AuthStackNavigationProps<"Auth">) => void;
    navLogIn: (navigation: AuthStackNavigationProps<"Auth">) => void;
    signOut: () => void;
}

type AuthStoreState = AuthStoreStateData & AuthStoreStateFunctions;

const DEFAULT_DATA: AuthStoreStateData = {
    signingIn: false,
    isLogin: false,
};

const useAuthStore = create<AuthStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    signInWithEmailPassword: async (email: string, password: string) => {
        set({ signingIn: true });

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password,
        });

        set({ signingIn: false });

        if (error) {
            switch (error.message) {
            case INVALID_LOGIN:
                errorToast(
                    'Invalid Login',
                    'Email and/or password are incorrect.',
                );
                break;
            default:
                errorToast('Oops! Unknown error.', JSON.stringify(error));
                break;
            }
            return;
        }
    },

    signUpWithEmailPassword: async (
        email: string,
        password: string,
    ) => {
        set({ signingIn: true });

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            set({ signingIn: false });
            switch (error.message) {
            case DUPLICATE_EMAIL:
                errorToast(
                    'Duplicate Email',
                    'This email address has already been registered.'
                );
                break;
            default:
                errorToast('Oops! Unknown error.', JSON.stringify(error));
                break;
            }
            return;
        }

        get().signInWithEmailPassword(email, password);
    },

    navSignUp: (navigation: AuthStackNavigationProps<"Auth">) => {
        navigation.navigate('SignUp');
    },

    navLogIn: (navigation: AuthStackNavigationProps<"Auth">) => {
        navigation.navigate('LogIn');
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
