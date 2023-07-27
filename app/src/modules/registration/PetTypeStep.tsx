import { Dices } from '@tamagui/lucide-icons';
import { chunk } from 'lodash';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, Label, XStack, YStack } from 'tamagui';
import { PET_ICON_MAP } from '@/constants';
import VerticalSpacer from '@common/VerticalSpacer';
import StepButtons from '@modules/registration/StepButtons';
import useRegistrationStore from '@modules/registration/store';
import { Step } from '@modules/registration/types';

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
            circular
            size="$4"
            bordered
            backgroundColor="$backgroundTransparent"
            borderColor="$background"
            borderWidth="$1"
            themeInverse={selected}
            icon={icon}
            onPress={() => onPress(value)}
            scaleIcon={2}
        />
    );
};

const petIcons = Object.keys(PET_ICON_MAP);

const PetTypeStep = () => {
    const { petType, setPetType, setStep } = useRegistrationStore();

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Label>Select your pet&#39;s type</Label>
            <YStack space>
                {chunk(petIcons, 5).map((pets, i) => (
                    <XStack
                        key={`pets_row_${i}`}
                        justifyContent="space-evenly"
                    >
                        {pets.map((pet) => (
                            <PetOption
                                key={pet}
                                value={pet}
                                selectedValue={petType}
                                onPress={(value) => setPetType(value)}
                            />
                        ))}
                    </XStack>
                ))}
            </YStack>
            <VerticalSpacer />
            <XStack justifyContent="center">
                <Button
                    icon={Dices}
                    size="$4"
                    color="$colorFocus"
                    chromeless
                    onPress={() =>
                        setPetType(
                            petIcons[
                                Math.floor(Math.random() * petIcons.length)
                            ]
                        )
                    }
                >
                    Randomize
                </Button>
            </XStack>
            <VerticalSpacer />
            <StepButtons
                nextButtonVisible={!!petType}
                nextStep={() => setStep(Step.PET_NATURE)}
                prevStep={() => setStep(Step.NAME)}
            />
        </Animated.View>
    );
};

export default PetTypeStep;
