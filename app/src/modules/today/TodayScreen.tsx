import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';
import PetCard from '@modules/pets/PetCard';
import TaskSection from '@modules/tasks/TaskSection';

const TodayScreen = () => {
    return (
        <>
            <ScreenHeader />
            <TabbedScreenWrapper>
                <PetCard />
                <TaskSection />
            </TabbedScreenWrapper>
        </>
    );
};

export default TodayScreen;
