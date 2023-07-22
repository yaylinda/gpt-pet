import {
    Baby,
    Bird,
    Cat,
    Dog,
    Egg,
    Fish,
    Ghost,
    PersonStanding,
    Rat,
    Skull,
} from '@tamagui/lucide-icons';
import { chunk } from 'lodash';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, Label, XStack, YStack } from 'tamagui';
import type { NamedExoticComponent } from 'react';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

const PET_ICON_MAP: Record<string, NamedExoticComponent> = {
    Bird: Bird,
    Cat: Cat,
    Dog: Dog,
    Fish: Fish,
    Rat: Rat,
    Egg: Egg,
    Ghost: Ghost,
    Skull: Skull,
    Baby: Baby,
    PersonStanding: PersonStanding,
};

interface PetOptionProps {
    value: string;
    selectedValue: string;
    onPress: (value: string) => void;
}

const PetOption = ({ value, selectedValue, onPress }: PetOptionProps) => {
    const selected = value === selectedValue;
    const icon = PET_ICON_MAP[value];

    if (!icon) {
        return null;
    }

    return (
        <Button
            size="$4"
            circular
            themeInverse={selected}
            icon={icon}
            onPress={() => onPress(value)}
        />
    );
};

const PetTypeStep = () => {
    const { selectedPet, setSelectedPet, setStep } = useRegistrationStore();

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <YStack>
                <Label>Select your pet type</Label>
                <YStack>
                    {chunk(Object.keys(PET_ICON_MAP), 5).map((pets, i) => (
                        <XStack
                            key={`pets_row_${i}`}
                            justifyContent="space-evenly"
                        >
                            {pets.map((pet) => (
                                <PetOption
                                    key={pet}
                                    value={pet}
                                    selectedValue={selectedPet}
                                    onPress={(value) => setSelectedPet(value)}
                                />
                            ))}
                        </XStack>
                    ))}
                </YStack>
            </YStack>
            <VerticalSpacer />
            <StepButtons
                disabled={!selectedPet}
                showNext={!!selectedPet}
                nextStep={() => setStep(Step.PET_NATURE)}
                prevStep={() => setStep(Step.NAME)}
            />
        </Animated.View>
    );
};

export default PetTypeStep;
