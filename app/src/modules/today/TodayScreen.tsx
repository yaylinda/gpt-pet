import { CalendarHeart } from '@tamagui/lucide-icons';
import moment from 'moment';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Button, XStack, YStack } from 'tamagui';
import useStore from '@/store';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';
import WeekNavigationCarousel from '@modules/today/WeekNavigationCarousel';
import useTodayStore from '@modules/today/store';

const TodayButton = () => {
    const { currentDate, goToToday } = useTodayStore();

    return (
        <YStack
            height={44} /* TODO - don't hard code */
            width={50} /* TODO - don't hard code */
            justifyContent="center"
            alignItems="center"
        >
            {currentDate.isSame(moment(), 'day') ? null : (
                <Button
                    size="$3"
                    circular
                    padding={0}
                    space={0}
                    gap={0}
                    chromeless
                    icon={CalendarHeart}
                    scaleIcon={1.5}
                    onPress={goToToday}
                />
            )}
        </YStack>
    );
};

const TodayScreen = () => {
    const { height } = useWindowDimensions();

    const { currentPet } = useStore();
    const { fetchDataForDay } = useTodayStore();

    React.useEffect(() => {
        fetchDataForDay();
    }, [fetchDataForDay]);

    return (
        <TabbedScreenWrapper>
            <ScreenHeader />
            {currentPet && <PetCard pet={currentPet} />}
            <VerticalSpacer />
            {/* TODO - don't hard code */}
            <XStack height={height * 0.55}>
                <YStack>
                    <TodayButton />
                    <WeekNavigationCarousel />
                </YStack>
                <TaskSection />
            </XStack>
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
