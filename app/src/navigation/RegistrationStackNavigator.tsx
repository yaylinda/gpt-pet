import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RegistrationLoadingScreen from '@modules/registration/RegistrationLoadingScreen';
import RegistrationScreen from '@modules/registration/RegistrationScreen';
import 'react-native-gesture-handler';

export type RegistrationStackParamList = {
    Registration: undefined;
    RegistrationLoading: undefined;
};

export type RegistrationStackNavigationProps<
    T extends keyof RegistrationStackParamList,
> = NativeStackScreenProps<RegistrationStackParamList, T>['navigation'];

export type RegistrationStackRouteProps<
    T extends keyof RegistrationStackParamList,
> = NativeStackScreenProps<RegistrationStackParamList, T>['route'];

const RegistrationStack =
    createNativeStackNavigator<RegistrationStackParamList>();

function RegistrationStackNavigator() {
    return (
        <RegistrationStack.Navigator>
            <RegistrationStack.Screen
                name="Registration"
                options={{ headerShown: false }}
                component={RegistrationScreen}
            />
            <RegistrationStack.Screen
                name="RegistrationLoading"
                options={{ headerShown: false }}
                component={RegistrationLoadingScreen}
            />
        </RegistrationStack.Navigator>
    );
}

export default RegistrationStackNavigator;
