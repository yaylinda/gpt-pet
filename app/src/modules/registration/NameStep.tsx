import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import useAuthStore from '@modules/auth/store';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const MIN_DISPLAY_NAME_LENGTH = 3;

const NameStep = () => {
    const { displayName, setDisplayName, setStep } = useRegistrationStore();
    const { signOut } = useAuthStore();

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
            <StepButtons
                disabled={displayName.length < MIN_DISPLAY_NAME_LENGTH}
                showNext={displayName.length >= MIN_DISPLAY_NAME_LENGTH}
                nextStep={() => setStep(Step.PET_TYPE)}
                prevStep={signOut}
            />
        </Animated.View>
    );
};

export default NameStep;
