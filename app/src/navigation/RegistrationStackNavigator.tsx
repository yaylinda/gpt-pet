import AuthScreen from '@modules/auth/AuthScreen';
import RegistrationScreen from '@modules/registration/RegistrationScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';

export type RegistrationStackParamList = {
    Registration: undefined;
};

export type RegistrationStackNavigationProps<T extends keyof RegistrationStackParamList> = NativeStackScreenProps<RegistrationStackParamList, T>['navigation'];

export type RegistrationStackRouteProps<T extends keyof RegistrationStackParamList> = NativeStackScreenProps<RegistrationStackParamList, T>['route'];

const RegistrationStack = createNativeStackNavigator<RegistrationStackParamList>();

function RegistrationStackNavigator() {
    return (
        <RegistrationStack.Navigator>
            <RegistrationStack.Screen
                name="Registration"
                options={{headerShown: false}}
                component={RegistrationScreen}
            />
        </RegistrationStack.Navigator>
    );
}

export default RegistrationStackNavigator;
