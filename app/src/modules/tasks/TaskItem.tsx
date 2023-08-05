import { Check, Undo2 } from '@tamagui/lucide-icons';
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, SizableText, XStack } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import useTasksStore from '@modules/tasks/store';
import useTodayStore from '@modules/today/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId, completed }: TaskItemProps) => {
    const { userId, getCurrentPet } = useStore();
    const { currentDate } = useTodayStore();
    const task = useTasksStore((state) => state.tasks[taskId]);
    const { completeTask, uncompleteTask } = useTasksStore();

    if (!task) {
        console.log(
            `\t\t[TaskItem][render(NULL)] currentDateKey=${getDateKey(
                currentDate
            )}, taskId=${taskId}, completed=${completed}`
        );
        return null;
    }

    const renderLeftActions = () => {
        if (currentDate.isAfter(moment(), 'day')) {
            return null;
        }

        if (completed) {
            return (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={{ justifyContent: 'center' }}
                >
                    <Button
                        size="$2"
                        borderRadius="$10"
                        icon={Undo2}
                        scaleIcon={1.5}
                        marginRight="$2"
                        onPress={() => uncompleteTask(userId, task, currentDate)}
                    >
                        Undo
                    </Button>
                </Animated.View>
            );
        }

        return (
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={{ width: '100%' }}
            >
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
            </Animated.View>
        );
    };

    const onSwipeableOpen = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            if (completed) {
                return;
            }

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            completeTask(userId, task, currentDate, getCurrentPet());
        } else if (direction === 'right') {
            // TODO
        }
    };

    console.log(
        `\t\t[TaskItem][render] currentDateKey=${getDateKey(currentDate)}, taskId=${taskId}, completed=${completed}`
    );

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Swipeable
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={onSwipeableOpen}
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

export default React.memo(TaskItem, (prev, next) => prev.taskId === next.taskId && prev.completed === next.completed);
