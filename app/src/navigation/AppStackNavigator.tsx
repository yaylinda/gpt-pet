import HomeScreen from '@modules/home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import type { AuthStackParamList } from './AuthStackNavigator';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import useStore from '@/store';
import LoadingScreen from '@common/LoadingScreen';
import 'react-native-gesture-handler';

export type AppStackParamList = {
    Loading: undefined;
    Home: undefined;
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

export type AppStackNavigationProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>['navigation'];

export type AppStackRouteProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>['route'];

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackNavigator({userId}: { userId?: string }) {
    const {loadingSession} = useStore();

    return (<AppStack.Navigator>
        {loadingSession ? (
            <AppStack.Screen
            name="Loading"
            options={{headerShown: false}}
            component={LoadingScreen}
        />) : userId ? (
            <AppStack.Screen
                name="Home"
                options={{headerShown: false}}
                component={HomeScreen}
            />
        ) : (
            <AppStack.Screen
            name="AuthStack"
            options={{headerShown: false}}
            component={AuthStackNavigator}
        />)}
    </AppStack.Navigator>);
}

export default React.memo(AppStackNavigator, (prev, next) => prev.userId === next.userId);
