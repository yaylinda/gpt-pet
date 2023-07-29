import { ScrollView } from 'react-native';
import { H3, Separator, SizableText, XStack, YGroup } from 'tamagui';
import useStore from '@/store';
import LogOutButton from '@common/LogOutButton';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import usePetsStore from '@modules/pets/store';

const ProfileScreen = () => {
    const { currentUser, dailyTasks } = useStore();
    const { pets } = usePetsStore();

    if (!currentUser) {
        return null;
    }

    return (
        <TabbedScreenWrapper>
            <ScreenHeader />
            <YGroup
                elevate
                padded
            >
                <YGroup.Item>
                    <H3 color="$colorFocus">{currentUser.displayName}</H3>
                    <XStack>
                        <SizableText
                            color="$color7"
                            size="$2"
                        >
                            {Object.keys(dailyTasks).length} daily tasks
                        </SizableText>
                        <Separator
                            marginHorizontal="$2"
                            vertical
                        />
                        <SizableText
                            color="$color7"
                            size="$2"
                        >
                            {pets.length} pet
                        </SizableText>
                    </XStack>
                </YGroup.Item>
            </YGroup>
            <ScrollView
                // contentContainerStyle={{ flex: 1, backgroundColor: 'green', padding: 50 }}
                onTouchStart={() => console.log('on touch start!')}
                onScrollBeginDrag={() => console.log('on begin drag!')}
            >
                {Array(50)
                    .fill(0)
                    .map((v, i) => (
                        <SizableText
                            padding="$4"
                            key={i}
                        >
                            list item {i}
                        </SizableText>
                    ))}
            </ScrollView>
            <LogOutButton />
        </TabbedScreenWrapper>
    );
};

export default ProfileScreen;
