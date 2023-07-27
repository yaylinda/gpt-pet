import React from 'react';
import { useWindowDimensions } from 'react-native';
import { XStack, YStack } from 'tamagui';
import useStore from '@/store';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';
import DateHeader from '@modules/today/DateHeader';
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
            <XStack height={height * 0.6}>
                <YStack height={height * 0.6}>
                    <YStack
                        height={44}
                        width={50}
                    />
                    <DateHeader />
                </YStack>
                <TaskSection />
            </XStack>
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
