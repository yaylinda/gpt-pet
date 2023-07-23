import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MIN_DISPLAY_NAME_LENGTH } from '@/constants';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const PetNameStep = () => {
    const { petName, setPetName, setStep } = useRegistrationStore();

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <TextInputWithLabel
                id="petName"
                label="What's your name?"
                value={petName}
                onUpdate={(value) => setPetName(value)}
            />
            <VerticalSpacer />
            <StepButtons
                showNext={petName.length >= MIN_DISPLAY_NAME_LENGTH}
                nextStep={() => setStep(Step.PET_NAME)}
                prevStep={() => setStep(Step.PET_TYPE)}
            />
        </Animated.View>
    );
};

export default PetNameStep;
