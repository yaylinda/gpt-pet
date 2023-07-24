import React from 'react';
import { Progress, SizableText } from 'tamagui';
import ScreenHeader from '@common/ScreenHeader';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import useRegistrationStore from '@modules/registration/store';

const RegistrationLoadingScreen = () => {
    const { progressUpdateUser, progressInsertPet, doRegistration } =
        useRegistrationStore();

    React.useEffect(() => {
        doRegistration();
    }, [doRegistration]);

    return (
        <FullHeightScreenWrapper>
            <ScreenHeader title="" />
            <Progress
                max={2}
                value={
                    [progressUpdateUser, progressInsertPet].filter((p) => p)
                        .length
                }
            >
                <Progress.Indicator animation="bouncy" />
            </Progress>
            <SizableText>
                Getting things set up for you and your new pet!
            </SizableText>
        </FullHeightScreenWrapper>
    );
};

export default RegistrationLoadingScreen;
