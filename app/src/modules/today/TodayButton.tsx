import { CalendarHeart } from '@tamagui/lucide-icons';
import moment from 'moment/moment';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, YStack } from 'tamagui';
import useTodayStore from '@modules/today/store';

const TodayButton = () => {
    const { currentDate, goToToday } = useTodayStore();

    return (
        <YStack
            height={44} /* TODO - don't hard code */
            width={50} /* TODO - don't hard code */
            justifyContent="center"
            alignItems="center"
        >
            {currentDate.isSame(moment(), 'day') ? null : (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                >
                    <Button
                        size="$3"
                        color="$colorFocus"
                        circular
                        padding={0}
                        space={0}
                        gap={0}
                        chromeless
                        icon={CalendarHeart}
                        scaleIcon={1.5}
                        onPress={goToToday}
                        pressStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                        }}
                    />
                </Animated.View>
            )}
        </YStack>
    );
};

export default TodayButton;
