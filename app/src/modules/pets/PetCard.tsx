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
import { H6, Separator, SizableText, XStack, YGroup } from 'tamagui';
import usePetsStore from '@modules/pets/store';

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

const PetCard = () => {
    const pet = usePetsStore((state) => state.pets?.[0]);

    if (!pet) {
        return null;
    }

    const petIcon = getIconForPet(pet.type);

    return (
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
    );
};

export default PetCard;
