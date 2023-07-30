import { Check } from '@tamagui/lucide-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';

import { Swipeable } from 'react-native-gesture-handler';

import { SizableText, XStack } from 'tamagui';
import useTasksStore from '@modules/tasks/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId }: TaskItemProps) => {
    const task = useTasksStore((state) => state.tasks[taskId]);

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
                gap="1.5"
                backgroundColor="$color11"
            >
                <Check />
                <SizableText
                    size="$4"
                    color="$color1"
                >
                    Done!
                </SizableText>
            </XStack>
        );
    };

    return (
        <Swipeable
            renderLeftActions={() => renderLeftActions()}
            onSwipeableOpen={() => console.log('is open now... call api to complete')}
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
                onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            >
                <SizableText>{task.emoji}</SizableText>
                <SizableText>{task.title}</SizableText>
            </XStack>
        </Swipeable>
    );
};

export default TaskItem;
