import { Plus } from '@tamagui/lucide-icons';
import moment from 'moment';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button } from 'tamagui';

import useTasksStore from '@modules/tasks/store';
import useTodayStore from '@modules/today/store';

const AddTaskButton = () => {
    const { openTaskDialog } = useTasksStore();
    const { currentDate } = useTodayStore();

    if (currentDate.isBefore(moment(), 'day')) {
        return null;
    }

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Button
                elevate
                circular
                themeInverse
                size="$4"
                position="absolute"
                bottom="$3"
                right="$3"
                icon={Plus}
                scaleIcon={2}
                onPress={() => openTaskDialog()}
            />
        </Animated.View>
    );
};

export default AddTaskButton;
