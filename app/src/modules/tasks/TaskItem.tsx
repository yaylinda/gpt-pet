import { Check } from '@tamagui/lucide-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SizableText, XStack } from 'tamagui';
import useStore from '@/store';
import useTasksStore from '@modules/tasks/store';

import useTodayStore from '@modules/today/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId }: TaskItemProps) => {
    const { userId, getCurrentPet } = useStore();
    const { currentDate } = useTodayStore();
    const task = useTasksStore((state) => state.tasks[taskId]);
    const { completeTask } = useTasksStore();

    if (!task) {
        return null;
    }

    const renderLeftActions = () => {
        return (
            <XStack
                height="$4"
                width="100%"
                justifyContent="flex-start"
                alignItems="center"
                marginVertical="$1.5"
                padding="$2"
                borderRadius="$10"
                borderWidth={0}
                gap="$1.5"
                backgroundColor="$color11"
            >
                <Check color="$color1" />
                <SizableText
                    size="$4"
                    color="$color1"
                >
                    Done!
                </SizableText>
            </XStack>
        );
    };

    const onComplete = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        completeTask(userId, task, currentDate, getCurrentPet());
    };

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Swipeable
                renderLeftActions={() => renderLeftActions()}
                onSwipeableOpen={onComplete}
            >
                <XStack
                    height="$4"
                    justifyContent="flex-start"
                    alignItems="center"
                    marginVertical="$1.5"
                    padding="$2"
                    borderRadius="$10"
                    borderColor="$color6"
                    borderWidth="$1.5"
                    borderStyle="solid"
                    backgroundColor="$color3"
                    gap="$1.5"
                >
                    <SizableText>{task.emoji}</SizableText>
                    <SizableText>{task.title}</SizableText>
                </XStack>
            </Swipeable>
        </Animated.View>
    );
};

export default TaskItem;
