import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button } from 'tamagui';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import useRegistrationStore from '@modules/registration/store';

const MIN_DISPLAY_NAME_LENGTH = 3;

const NameRegistrationStep = ({ nextStep }: RegistrationStepProps) => {
    const { displayName, setDisplayName } = useRegistrationStore();

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <TextInputWithLabel
                id="displayName"
                label="What's your name?"
                value={displayName}
                onUpdate={(value) => setDisplayName(value)}
            />
            <VerticalSpacer />
            {displayName.length >= MIN_DISPLAY_NAME_LENGTH && (
                <Animated.View entering={FadeIn}>
                    <Button
                        themeInverse
                        onPress={nextStep}
                    >
                        Next
                    </Button>
                </Animated.View>
            )}
        </Animated.View>
    );
};

export default NameRegistrationStep;
