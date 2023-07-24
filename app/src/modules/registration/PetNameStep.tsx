import * as Burnt from 'burnt';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MIN_DISPLAY_NAME_LENGTH } from '@/constants';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const PetNameStep = () => {
    const { petName, setPetName, setStep, doRegistration } =
        useRegistrationStore();

    const onStart = async () => {
        Burnt.alert({
            title: 'Hang on',
            message: 'Getting things ready for you and your new pet',
            preset: 'spinner',
            duration: 2,
        });

        const status = await doRegistration();

        if (status) {
            Burnt.dismissAllAlerts();
        }
    };

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <TextInputWithLabel
                id="petName"
                label="Give your pet a name"
                value={petName}
                onUpdate={(value) => setPetName(value)}
            />
            <VerticalSpacer />
            <StepButtons
                nextButtonVisible={petName.length >= MIN_DISPLAY_NAME_LENGTH}
                nextStep={onStart}
                prevStep={() => setStep(Step.PET_TYPE)}
                nextButtonText="Start!"
            />
        </Animated.View>
    );
};

export default PetNameStep;
