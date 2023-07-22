import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import type { AuthStackParamList } from './AuthStackNavigator';
import type { RegistrationStackParamList } from '@nav/RegistrationStackNavigator';
import type { TabStackParamList } from '@nav/TabStackNavigator';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import useStore from '@/store';
import LoadingScreen from '@common/LoadingScreen';
import RegistrationStackNavigator from '@nav/RegistrationStackNavigator';
import TabStackNavigator from '@nav/TabStackNavigator';
import 'react-native-gesture-handler';

export type AppStackParamList = {
    Loading: undefined;
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
    RegistrationStack: NavigatorScreenParams<RegistrationStackParamList>;
    TabStack: NavigatorScreenParams<TabStackParamList>;
};

export type AppStackNavigationProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
    AppStackParamList,
    T
>['navigation'];

export type AppStackRouteProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
    AppStackParamList,
    T
>['route'];

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackNavigator() {
    const { loadingSession, userId, currentUser } = useStore();

    const hasUser = currentUser !== null;
    const hasRegistered = currentUser?.hasRegistered;

    const renderStack = React.useCallback(() => {
        if (loadingSession || (userId && !hasUser)) {
            return (
                <AppStack.Screen
                    name="Loading"
                    options={{ headerShown: false }}
                    component={LoadingScreen}
                />
            );
        }

        if (!userId) {
            return (
                <AppStack.Screen
                    name="AuthStack"
                    options={{ headerShown: false }}
                    component={AuthStackNavigator}
                />
            );
        }

        if (hasRegistered) {
            return (
                <AppStack.Screen
                    name="TabStack"
                    options={{ headerShown: false }}
                    component={TabStackNavigator}
                />
            );
        }

        if (hasUser && !hasRegistered) {
            return (
                <AppStack.Screen
                    name="RegistrationStack"
                    options={{ headerShown: false }}
                    component={RegistrationStackNavigator}
                />
            );
        }
    }, [loadingSession, userId, hasUser, hasRegistered]);

    return <AppStack.Navigator>{renderStack()}</AppStack.Navigator>;
}

export default AppStackNavigator;
