import React from 'react';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import { H1, SizableText } from 'tamagui';
import ScreenHeader from '@common/ScreenHeader';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import NameRegistrationStep from '@modules/registration/NameRegistrationStep';
import PetRegistrationStep from '@modules/registration/PetRegistrationStep';

enum Step {
    NAME = 'NAME',
    PET = 'PET',
}

const RegistrationScreen = () => {
    const [step, setStep] = React.useState<Step>(Step.NAME);

    const renderStep = () => {
        switch (step) {
            case Step.NAME:
                return (
                    <NameRegistrationStep nextStep={() => setStep(Step.PET)} />
                );
            case Step.PET:
                return (
                    <PetRegistrationStep
                        prevStep={() => setStep(Step.NAME)}
                        nextStep={() => setStep(Step.PET)}
                    />
                );
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
                    <SizableText marginVertical="$2">
                        Let&#39;s learn a little about you...
                    </SizableText>
                </Animated.View>

                <Animated.View entering={FadeIn.delay(1500)}>
                    {renderStep()}
                </Animated.View>
            </FullHeightScreenWrapper>
        </>
    );
};

export default RegistrationScreen;
