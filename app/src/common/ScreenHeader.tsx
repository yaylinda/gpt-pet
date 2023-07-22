import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Heading, XStack } from 'tamagui';
import type { NamedExoticComponent } from 'react';

interface ScreenHeaderProps {
    title: string;
    leftButtonIcon?: NamedExoticComponent;
    leftButtonAction?: () => void;
    rightButtonIcon?: NamedExoticComponent;
    rightButtonAction?: () => void;
}

function ScreenHeader({
    title,
    leftButtonIcon,
    leftButtonAction,
    rightButtonIcon,
    rightButtonAction,
}: ScreenHeaderProps) {
    const { top } = useSafeAreaInsets();

    const leftComponent =
        leftButtonIcon && leftButtonAction ? (
            <Button
                size="$4"
                circular
                icon={leftButtonIcon}
                onPress={() => leftButtonAction()}
            />
        ) : undefined;

    const rightComponent =
        rightButtonIcon && rightButtonAction ? (
            <Button
                size="$4"
                circular
                icon={rightButtonIcon}
                onPress={() => rightButtonAction()}
            />
        ) : undefined;

    return (
        <XStack
            paddingTop={top}
            justifyContent="space-between"
            alignItems="center"
        >
            <XStack
                justifyContent="flex-start"
                width="20%"
            >
                {leftComponent}
            </XStack>
            <Heading>{title}</Heading>
            <XStack
                justifyContent="flex-end"
                width="20%"
            >
                {rightComponent}
            </XStack>
        </XStack>
    );
}

export default ScreenHeader;
