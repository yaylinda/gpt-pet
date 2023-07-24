import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'tamagui';
import useAuthStore from '@modules/auth/store';

const LogOutButton = () => {
    const { signOut } = useAuthStore();

    const confirmLogout = React.useCallback(
        () =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: signOut,
                    style: 'destructive',
                },
            ]), // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <Button
            onPress={confirmLogout}
            size="$4"
        >
            Log Out
        </Button>
    );
};

export default LogOutButton;
