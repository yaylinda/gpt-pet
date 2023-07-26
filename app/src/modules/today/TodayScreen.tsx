import React from 'react';
import useStore from '@/store';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';
import DateHeader from '@modules/today/DateHeader';
import useTodayStore from '@modules/today/store';

const TodayScreen = () => {
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
            <DateHeader />
            <VerticalSpacer />
            <TaskSection />
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
