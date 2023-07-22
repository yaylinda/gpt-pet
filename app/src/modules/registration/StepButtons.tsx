import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, XStack } from 'tamagui';
import type { RegistrationStepProps } from '@modules/registration/types';

interface StepButtonsProps extends RegistrationStepProps {
    disabled: boolean;
    showNext: boolean;
}

const StepButtons = ({
    prevStep,
    nextStep,
    disabled,
    showNext,
}: StepButtonsProps) => {
    return (
        <XStack justifyContent="space-between">
            {prevStep && (
                <Button
                    size="$4"
                    bordered
                    onPress={prevStep}
                >
                    Previous
                </Button>
            )}
            {showNext && (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                >
                    <Button
                        size="$4"
                        themeInverse
                        onPress={nextStep}
                        disabled={disabled}
                    >
                        Next
                    </Button>
                </Animated.View>
            )}
        </XStack>
    );
};

export default StepButtons;
