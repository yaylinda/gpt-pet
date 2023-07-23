import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarHeart, UserCog2 } from '@tamagui/lucide-icons';
import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfileScreen from '@modules/profile/ProfileScreen';
import TodayScreen from '@modules/today/TodayScreen';

export type TabStackParamList = {
    Today: undefined;
    Profile: undefined;
};

export type TabStackNavigationProps<T extends keyof TabStackParamList> =
    NativeStackScreenProps<TabStackParamList, T>['navigation'];

export type TabStackRouteProps<T extends keyof TabStackParamList> =
    NativeStackScreenProps<TabStackParamList, T>['route'];

const TabStack = createBottomTabNavigator<TabStackParamList>();

function TabStackNavigator() {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: () => null,
                tabBarIcon: ({ focused }) => {
                    const color = focused ? '$colorFocus' : '$color';
                    switch (route.name) {
                        case 'Today':
                            return <CalendarHeart color={color} />;
                        case 'Profile':
                            return <UserCog2 color={color} />;
                    }
                },
                tabBarStyle: {
                    position: 'absolute',
                    paddingTop: 8, // TODO
                    backgroundColor: 'transparent',
                },
            })}
        >
            <TabStack.Screen
                name="Today"
                options={{ headerShown: false }}
                component={TodayScreen}
            />
            <TabStack.Screen
                name="Profile"
                options={{ headerShown: false }}
                component={ProfileScreen}
            />
        </TabStack.Navigator>
    );
}

export default TabStackNavigator;
