import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';
import config from './tamagui.config';
import type { UserRow } from '@modules/users/types';
import { Tables } from '@/enums';
import useStore from '@/store';
import { supabase } from '@/supabase';
import useUsersStore from '@modules/users/store';
import AppStackNavigator from '@nav/AppStackNavigator';

export default function App() {
    const { userId, setUserId, updateCurrentUser } = useStore();
    const { upsertUser } = useUsersStore();
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        Silkscreen: require('@tamagui/font-silkscreen/files/slkscr.ttf'),
        SilkscreenBold: require('@tamagui/font-silkscreen/files/slkscrb.ttf'), // Silkscreen: require('assets/fonts/silkscreen/Silkscreen-Regular.ttf'),
        // SilkscreenBold: require('assets/fonts/silkscreen/Silkscreen-Bold.ttf'),
        // play around with silkscreen and fira-mono
    });

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log(`[App][getSession] session=${JSON.stringify(session)}`);
            setUserId(session?.user.id || '');
        });

        console.log('[App] subscribing to authSubscription');
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(
                `[App][onAuthStateChange][subscription] _event=${JSON.stringify(
                    _event
                )} session=${JSON.stringify(session)}`
            );
            setUserId(session?.user.id || '');
        });

        return () => {
            console.log('[App] unsubscribing from authSubscription');
            subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!userId) {
            return;
        }

        console.log(
            `[App] subscribing to user, pets, tasks, completed_tasks, on channel='user_${userId}'`
        );

        const userSubscriptions = supabase
            .channel(`user_${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.USERS,
                    filter: `id=eq.${userId}`,
                },
                (payload) => {
                    updateCurrentUser(payload.new as UserRow);
                    upsertUser(payload.new as UserRow);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.PETS,
                },
                (payload) => {
                    upsertChat(payload.new as Chats);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.PETS,
                },
                (payload) => {
                    upsertChat(payload.new as Chats);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.TASKS,
                },
                (payload) => upsertFriends(payload.new as Friends)
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.TASKS,
                },
                (payload) => upsertFriends(payload.new as Friends)
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.COMPLETED_TASKS,
                },
                (payload) => upsertPurchases(payload.new as Purchases)
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: Tables.COMPLETED_TASKS,
                },
                (payload) => upsertPurchases(payload.new as Purchases)
            )
            .subscribe();

        return () => {
            console.log(
                `[App] unsubscribing from profiles, chats, friends on channel='user_${userId}'`
            );
            userSubscriptions.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config}>
            <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppStackNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </Theme>
        </TamaguiProvider>
    );
}
