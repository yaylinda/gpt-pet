import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';
import config from './tamagui.config';
import type { CompletedTaskRow } from '@modules/completedTasks/types';
import type { PetRow } from '@modules/pets/types';
import type { TaskRow } from '@modules/tasks/types';
import type { UserRow } from '@modules/users/types';
import { Tables } from '@/enums';
import useStore from '@/store';
import { supabase } from '@/supabase';
import useCompletedTasksStore from '@modules/completedTasks/store';
import usePetsStore from '@modules/pets/store';
import useTasksStore from '@modules/tasks/store';
import useUsersStore from '@modules/users/store';
import AppStackNavigator from '@nav/AppStackNavigator';

export default function App() {
    const { userId, setUserId, updateCurrentUser, theme } = useStore();
    const { upsertUser } = useUsersStore();
    const { upsertPet } = usePetsStore();
    const { upsertTask } = useTasksStore();
    const { insertCompletedTask, deleteCompletedTask } =
        useCompletedTasksStore();

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        Silkscreen: require('@tamagui/font-silkscreen/files/slkscr.ttf'),
        SilkscreenBold: require('@tamagui/font-silkscreen/files/slkscrb.ttf'),
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
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    upsertPet(payload.new as PetRow);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.PETS,
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    upsertPet(payload.new as PetRow);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.TASKS,
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => upsertTask(payload.new as TaskRow)
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.TASKS,
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => upsertTask(payload.new as TaskRow)
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.COMPLETED_TASKS,
                    filter: `user_id=eq.${userId}`,
                },
                (payload) =>
                    insertCompletedTask(payload.old as CompletedTaskRow)
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: Tables.COMPLETED_TASKS,
                    filter: `user_id=eq.${userId}`,
                },
                (payload) =>
                    deleteCompletedTask(payload.old as CompletedTaskRow)
            )
            .subscribe();

        return () => {
            console.log(
                `[App] unsubscribing from user, pets, tasks, completed_tasks, on channel='user_${userId}'`
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
            <Theme name={theme}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppStackNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </Theme>
        </TamaguiProvider>
    );
}
