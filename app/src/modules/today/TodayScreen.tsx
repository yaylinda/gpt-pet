import React from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { YStack } from 'tamagui';
import useStore from '@/store';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';
import TodayButton from '@modules/today/TodayButton';
import WeekNavigationCarousel from '@modules/today/WeekNavigationCarousel';
import useTodayStore from '@modules/today/store';

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
            <Animated.View
                entering={FadeIn.delay(500)}
                style={{
                    height: height * 0.55,
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <YStack>
                    <TodayButton />
                    <WeekNavigationCarousel />
                </YStack>
                <TaskSection />
            </Animated.View>
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
