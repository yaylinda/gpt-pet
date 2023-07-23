import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, XStack } from 'tamagui';
import type { RegistrationStepProps } from '@modules/registration/types';

interface StepButtonsProps extends RegistrationStepProps {
    nextStep: () => void;
    prevStep?: () => void;
    nextButtonVisible: boolean;
    nextButtonText?: string;
}

const StepButtons = ({
    prevStep,
    nextStep,
    nextButtonVisible,
    nextButtonText = 'Next',
}: StepButtonsProps) => {
    return (
        <XStack justifyContent="space-between">
            {prevStep && (
                <Button
                    size="$4"
                    bordered
                    onPress={prevStep}
                    borderColor="$color"
                >
                    Back
                </Button>
            )}
            {nextButtonVisible && (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                >
                    <Button
                        size="$4"
                        themeInverse
                        onPress={nextStep}
                    >
                        {nextButtonText}
                    </Button>
                </Animated.View>
            )}
        </XStack>
    );
};

export default StepButtons;
