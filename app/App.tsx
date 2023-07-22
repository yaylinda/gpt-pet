import useStore from '@/store';
import {supabase} from '@/supabase';
import AppStackNavigator from '@nav/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TamaguiProvider, Theme} from 'tamagui';
import config from './tamagui.config';

import { LogBox } from "react-native";
LogBox.ignoreLogs(['No font size found $true undefined in size tokens ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13", "$14", "$15", "$16"]']);

export default function App() {
    const { setUserId, userId } = useStore();
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
        Silkscreen: require('@tamagui/font-silkscreen/files/slkscr.ttf'),
        SilkscreenBold: require('@tamagui/font-silkscreen/files/slkscrb.ttf'),
        // Silkscreen: require('assets/fonts/silkscreen/Silkscreen-Regular.ttf'),
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

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config}>
            <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppStackNavigator userId={userId} />
                    </NavigationContainer>
                </SafeAreaProvider>
            </Theme>
        </TamaguiProvider>
    );
}
