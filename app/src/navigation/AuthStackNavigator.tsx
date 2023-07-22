import AuthScreen from '@modules/auth/AuthScreen';
import AuthStackLogInScreen from '@modules/auth/AuthStackLogInScreen';
import AuthStackSignUpScreen from '@modules/auth/AuthStackSignUpScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';

export type AuthStackParamList = {
    Auth: undefined;
    LogIn: undefined;
    SignUp: undefined;
};

export type AuthStackNavigationProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>['navigation'];

export type AuthStackRouteProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>['route'];

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Auth"
                options={{headerShown: false}}
                component={AuthScreen}
            />
            <AuthStack.Screen
                name="LogIn"
                options={{headerShown: false}}
                component={AuthStackLogInScreen}
            />
            <AuthStack.Screen
                name="SignUp"
                options={{headerShown: false}}
                component={AuthStackSignUpScreen}
            />
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator;
