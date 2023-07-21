import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthScreen from '@modules/auth/AuthScreen';
import 'react-native-gesture-handler';

export type AuthStackParamList = {
    Auth: undefined;
};

export type AuthStackNavigationProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
    AuthStackParamList,
    T
>['navigation'];

export type AuthStackRouteProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
    AuthStackParamList,
    T
>['route'];

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Auth"
                options={{ headerShown: false }}
                component={AuthScreen}
            />
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator;
