import React from 'react';
import { useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { XStack, YStack } from 'tamagui';
import useStore from '@/store';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import AddTaskButton from '@modules/tasks/AddTaskButton';
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
            <GestureHandlerRootView>
                <Animated.View entering={FadeIn.delay(500)}>
                    <XStack
                        height={height * 0.55} // TODO - don't hard code
                        elevation="$4"
                    >
                        <YStack>
                            <TodayButton />
                            <WeekNavigationCarousel />
                        </YStack>
                        <TaskSection />
                        <AddTaskButton />
                    </XStack>
                </Animated.View>
            </GestureHandlerRootView>
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
