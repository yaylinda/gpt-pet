import LogOutButton from '@common/LogOutButton';
import ScreenHeader from '@common/ScreenHeader';
import { TabbedScreenWrapper } from '@common/ScreenWrapper';

const ProfileScreen = () => {
    return (
        <TabbedScreenWrapper>
            <ScreenHeader />
            <LogOutButton />
        </TabbedScreenWrapper>
    );
};

export default ProfileScreen;
