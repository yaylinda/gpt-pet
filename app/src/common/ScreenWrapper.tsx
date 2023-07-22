import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeableStack } from 'tamagui';

interface ScreenWrapperProps {
    children: React.ReactNode;
    centered?: boolean;
    space?: string | number;
}

export function FullHeightScreenWrapper({
    children,
    centered,
    space,
}: ScreenWrapperProps) {
    const { bottom } = useSafeAreaInsets();

    return (
        <ThemeableStack
            flex={1}
            padded
            paddingBottom={bottom}
            justifyContent={centered ? 'center' : undefined}
            space={space}
        >
            <StatusBar barStyle="default" />
            {children}
        </ThemeableStack>
    );
}

export function TabbedScreenWrapper({ children }: ScreenWrapperProps) {
    const bottom = useBottomTabBarHeight();

    return (
        <ThemeableStack
            flex={1}
            padded
            paddingTop="$2"
            paddingBottom={bottom}
        >
            <StatusBar barStyle="default" />
            {children}
        </ThemeableStack>
    );
}
