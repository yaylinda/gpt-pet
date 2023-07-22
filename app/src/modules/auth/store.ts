import {errorToast} from '@common/alerts';
import {EMAIL_REGEX} from '@common/constants';
import {AuthStackNavigationProps} from '@nav/AuthStackNavigator';
import {isEmpty} from 'lodash';
import {Alert, Platform} from 'react-native';
import {err} from 'react-native-svg/lib/typescript/xml';
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
    submit: (email: string, password: string, passwordConf: string | null) => Record<string, string> | void;
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

    submit: (email: string, password: string, passwordConf: string | null): Record<string, string> | void => {
        const errors: Record<string, string> = {};

        if (!EMAIL_REGEX.test(email)) {
            errors['email'] = 'Please enter a valid email address (ex: email@address.com)';
        }

        if (!password) {
            errors['password'] = 'Please enter a password';
        }

        if (password && passwordConf !== null && password !== passwordConf) {
            errors['password'] = 'Passwords must match';
            errors['passwordConf'] = 'Passwords must match';
        }

        if (!isEmpty(errors)) {
            return errors;
        }

        if (get().isLogin) {
            get().signInWithEmailPassword(email, password);
        } else {
            get().signUpWithEmailPassword(email, password);
        }
    },

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

        if (get().isLogin) {
            Burnt.toast({
                title: 'Login Success',
                message: 'Welcome back 👋',
                preset: 'done',
                haptic: 'success'
            });
        } else {
            Burnt.alert({
                title: "Welcome 👋",
                message: "Get ready to meet the cutest little Blobby Pet, and accomplish tasks together!",
                preset: 'done',
            });
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
        set({ isLogin: false });
    },

    navLogIn: (navigation: AuthStackNavigationProps<"Auth">) => {
        navigation.navigate('LogIn');
        set({ isLogin: true });
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
