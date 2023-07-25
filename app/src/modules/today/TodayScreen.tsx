import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';
import DateHeader from '@modules/today/DateHeader';

const TodayScreen = () => {
    return (
        <TabbedScreenWrapper>
            <ScreenHeader />
            <PetCard />
            <VerticalSpacer />
            <DateHeader />
            <VerticalSpacer />
            <TaskSection />
            <VerticalSpacer />
        </TabbedScreenWrapper>
    );
};

export default TodayScreen;
