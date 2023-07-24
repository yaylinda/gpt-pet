import React from 'react';
import { useWindowDimensions } from 'react-native';
import { SizableText, Spinner } from 'tamagui';
import ScreenHeader from '@common/ScreenHeader';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import useRegistrationStore from '@modules/registration/store';

const RegistrationLoadingScreen = () => {
    const {  } = useWindowDimensions();

    const {   doRegistration } =
        useRegistrationStore();

    React.useEffect(() => {
        doRegistration();
    }, [doRegistration]);

    return (
        <FullHeightScreenWrapper>
            <ScreenHeader />
            <Spinner />
            <SizableText>
                Getting things set up for you and your new pet!
            </SizableText>
        </FullHeightScreenWrapper>
    );
};

export default RegistrationLoadingScreen;
