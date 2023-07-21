import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

/**
 *
 */
const getSupabaseClient = () => {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    console.log(`[supabase] creating supabase client with supabaseUrl=${supabaseUrl}`);

    return createClient(supabaseUrl!, supabaseAnonKey!, {
        auth: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: ExpoSecureStoreAdapter as any,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    });
};

export const supabase = getSupabaseClient();
