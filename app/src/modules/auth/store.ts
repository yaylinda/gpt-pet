import * as Burnt from 'burnt';
import { isEmpty } from 'lodash';
import { create } from 'zustand';
import type { AuthStackNavigationProps } from '@nav/AuthStackNavigator';
import { errorAlert } from '@/alerts';
import { EMAIL_REGEX } from '@/constants';
import { DUPLICATE_EMAIL, INVALID_LOGIN } from '@/errors';
import useUserStore from '@/store';
import { supabase } from '@/supabase';

interface AuthStoreStateData {
    signingIn: boolean;
    justSignedUp: boolean;
}

interface AuthStoreStateFunctions {
    submit: (
        email: string,
        password: string,
        passwordConf: string | null
    ) => Record<string, string> | void;
    signInWithEmailPassword: (email: string, password: string) => void;
    signUpWithEmailPassword: (email: string, password: string) => void;
    navSignUp: (
        navigation: AuthStackNavigationProps<'Auth'>,
        animate: boolean
    ) => void;
    navLogIn: (
        navigation: AuthStackNavigationProps<'Auth'>,
        animate: boolean
    ) => void;
    signOut: () => void;
}

type AuthStoreState = AuthStoreStateData & AuthStoreStateFunctions;

const DEFAULT_DATA: AuthStoreStateData = {
    signingIn: false,
    justSignedUp: false,
};

const useAuthStore = create<AuthStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    submit: (
        email: string,
        password: string,
        passwordConf: string | null
    ): Record<string, string> | void => {
        const errors: Record<string, string> = {};

        if (!EMAIL_REGEX.test(email)) {
            errors['email'] =
                'Please enter a valid email address (ex: email@address.com)';
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

        if (get().justSignedUp) {
            get().signUpWithEmailPassword(email, password);
        } else {
            get().signInWithEmailPassword(email, password);
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
                    errorAlert(
                        'Invalid Login',
                        'Email and/or password are incorrect.'
                    );
                    break;
                default:
                    errorAlert('Oops! Unknown error.', JSON.stringify(error));
                    break;
            }
            return;
        }

        if (get().justSignedUp) {
            Burnt.toast({
                title: 'Sign Up Success!',
                preset: 'done',
                haptic: 'success',
            });
        } else {
            Burnt.toast({
                title: 'Login Success!',
                preset: 'done',
                haptic: 'success',
            });
        }
    },

    signUpWithEmailPassword: async (email: string, password: string) => {
        set({ signingIn: true });

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            set({ signingIn: false });
            switch (error.message) {
                case DUPLICATE_EMAIL:
                    errorAlert(
                        'Duplicate Email',
                        'This email address has already been registered.'
                    );
                    break;
                default:
                    errorAlert('Oops! Unknown error.', JSON.stringify(error));
                    break;
            }
            return;
        }

        get().signInWithEmailPassword(email, password);
    },

    navSignUp: (
        navigation: AuthStackNavigationProps<'Auth'>,
        animate: boolean
    ) => {
        navigation.navigate('SignUp', { animate });
        set({ justSignedUp: true });
    },

    navLogIn: (
        navigation: AuthStackNavigationProps<'Auth'>,
        animate: boolean
    ) => {
        navigation.navigate('LogIn', { animate });
        set({ justSignedUp: false });
    },

    signOut: () => {
        supabase.auth.signOut();
        useUserStore.getState().reset();
        set({
            ...DEFAULT_DATA,
        });
    },
}));

export default useAuthStore;
