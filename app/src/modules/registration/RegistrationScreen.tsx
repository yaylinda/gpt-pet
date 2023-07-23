import React from 'react';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { H1 } from 'tamagui';
import ScreenHeader from '@common/ScreenHeader';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import NameStep from '@modules/registration/NameStep';
import PetNameStep from '@modules/registration/PetNameStep';
import PetNatureStep from '@modules/registration/PetNatureStep';
import PetTypeStep from '@modules/registration/PetTypeStep';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const RegistrationScreen = () => {
    const { step } = useRegistrationStore();

    const renderStep = () => {
        switch (step) {
            case Step.NAME:
                return <NameStep />;
            case Step.PET_TYPE:
                return <PetTypeStep />;
            case Step.PET_NATURE:
                return <PetNatureStep />;
            case Step.PET_NAME:
                return <PetNameStep />;
        }
    };

    return (
        <>
            <ScreenHeader title="" />
            <FullHeightScreenWrapper>
                <Animated.View entering={BounceIn}>
                    <H1>Welcome!</H1>
                </Animated.View>

                <Animated.View entering={FadeIn.delay(750)}>
                    {renderStep()}
                </Animated.View>
            </FullHeightScreenWrapper>
        </>
    );
};

export default RegistrationScreen;
