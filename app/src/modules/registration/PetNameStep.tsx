import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { RegistrationStackNavigationProps } from '@nav/RegistrationStackNavigator';
import { MIN_DISPLAY_NAME_LENGTH } from '@/constants';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const PetNameStep = () => {
    const navigation =
        useNavigation<RegistrationStackNavigationProps<'Registration'>>();

    const { petName, setPetName, setStep } = useRegistrationStore();

    const onStart = () => {
        navigation.navigate('RegistrationLoading');
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
