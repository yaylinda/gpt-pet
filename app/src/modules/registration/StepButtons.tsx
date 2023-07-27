import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, Separator, XStack } from 'tamagui';
import type { RegistrationStepProps } from '@modules/registration/types';
import VerticalSpacer from '@common/VerticalSpacer';

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
        <>
            <Separator
                borderColor="$color"
                borderTopWidth="$0.25"
                borderBottomWidth="$0"
                opacity={0.25}
            />
            <VerticalSpacer />
            <XStack justifyContent="space-between">
                {prevStep && (
                    <Button
                        size="$4"
                        onPress={prevStep}
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
        </>
    );
};

export default StepButtons;
