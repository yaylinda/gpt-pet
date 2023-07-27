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
import Animated, { BounceIn } from 'react-native-reanimated';
import { H6, Separator, SizableText, XStack, YGroup } from 'tamagui';
import type { Pet } from '@modules/pets/types';

const getIconForPet = (icon: string) => {
    switch (icon) {
        case 'Bird':
            return <Bird />;
        case 'Cat':
            return <Cat />;
        case 'Dog':
            return <Dog />;
        case 'Fish':
            return <Fish />;
        case 'Rat':
            return <Rat />;
        case 'Egg':
            return <Egg />;
        case 'Ghost':
            return <Ghost />;
        case 'Skull':
            return <Skull />;
        case 'Baby':
            return <Baby />;
        case 'PersonStanding':
            return <PersonStanding />;
    }
};

interface PetCardProps {
    pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
    const petIcon = getIconForPet(pet.type);

    return (
        <Animated.View
            style={{ flex: 1 }}
            entering={BounceIn}
        >
            <YGroup
                flex={1}
                elevate
                padded
            >
                <YGroup.Item>
                    <XStack
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <H6 color="$colorFocus">{pet.displayName}</H6>
                        <SizableText color="$color7">LVL {1}</SizableText>
                    </XStack>
                    <Separator marginVertical="$2" />
                    {petIcon}
                </YGroup.Item>
            </YGroup>
        </Animated.View>
    );
};

export default PetCard;
