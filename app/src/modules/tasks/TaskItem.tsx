import { Check } from '@tamagui/lucide-icons';
import * as Burnt from 'burnt';
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SizableText, XStack } from 'tamagui';
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
    const { completeTask } = useTasksStore();

    if (!task) {
        console.log(
            `\t\t[TaskItem][render(NULL)] currentDateKey=${getDateKey(
                currentDate
            )}, taskId=${taskId}, completed=${completed}`
        );
        return null;
    }

    const renderLeftActions = () => {
        if (completed) {
            return null;
        }

        if (currentDate.isAfter(moment(), 'day')) {
            // return <View style={{ width: '10%' }} />;
            return null;
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

    const onComplete = (direction: 'left' | 'right' ) => {
        if (direction === 'left') {
            if (currentDate.isAfter(moment(), 'day')) {
                // swipeable.close();
                Burnt.toast({
                    title: 'Can\'t complete tasks in the future...',
                    preset: 'custom',
                    icon: {
                        ios: {
                            name: '',
                            color: '',
                        },
                    },
                    haptic: 'warning',
                    duration: 1,
                });
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

export default React.memo(TaskItem, (prev, next) => prev.taskId === next.taskId && prev.completed === next.completed);
