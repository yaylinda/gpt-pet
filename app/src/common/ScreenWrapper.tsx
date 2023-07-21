import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeableStack } from 'tamagui';

interface ScreenWrapperProps {
    children: React.ReactNode;
}

export function FullHeightScreenWrapper({ children }: ScreenWrapperProps) {
    const { bottom } = useSafeAreaInsets();

    return (
        <ThemeableStack flex={1} padded paddingTop="$2" paddingBottom={bottom}>
            <StatusBar barStyle="default" />
            {children}
        </ThemeableStack>
    );
}

export function TabbedScreenWrapper({ children }: ScreenWrapperProps) {
    const bottom = useBottomTabBarHeight();

    return (
        <ThemeableStack flex={1} padded paddingTop="$2" paddingBottom={bottom}>
            <StatusBar barStyle="default" />
            {children}
        </ThemeableStack>
    );
}
