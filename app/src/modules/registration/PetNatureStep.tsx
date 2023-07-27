import { Dices } from '@tamagui/lucide-icons';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, Label, XStack } from 'tamagui';
import { NUM_NATURES, PET_NATURES } from '@/constants';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

interface PetNatureOptionProps {
    nature: string;
    selected: boolean;
}

const PetNatureOption = ({ nature, selected }: PetNatureOptionProps) => {
    const { togglePetNature } = useRegistrationStore();
    return (
        <Button
            key={`${nature}_${selected}`}
            size="$2"
            bordered
            backgroundColor="$backgroundTransparent"
            borderColor="$background"
            borderWidth="$1"
            themeInverse={selected}
            onPress={() => togglePetNature(nature)}
        >
            {nature}
        </Button>
    );
};

const PetNatureStep = () => {
    const { petNatures, randomizePetNatures, setStep } = useRegistrationStore();

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Label>Select your pet&#39;s natures</Label>
            <XStack
                flexWrap="wrap"
                gap="$2"
            >
                {PET_NATURES.map((nature) => (
                    <PetNatureOption
                        key={nature}
                        nature={nature}
                        selected={petNatures.includes(nature)}
                    />
                ))}
            </XStack>
            <VerticalSpacer />
            <XStack justifyContent="center">
                <Button
                    icon={Dices}
                    size="$4"
                    color="$colorFocus"
                    chromeless
                    onPress={randomizePetNatures}
                >
                    Randomize
                </Button>
            </XStack>
            <VerticalSpacer />
            <StepButtons
                nextButtonVisible={petNatures.length === NUM_NATURES}
                nextStep={() => setStep(Step.PET_NAME)}
                prevStep={() => setStep(Step.PET_TYPE)}
            />
        </Animated.View>
    );
};

export default PetNatureStep;
