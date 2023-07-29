import React from 'react';
import { Button, SizableText, XStack, YStack } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';
import TaskTabContent from '@modules/tasks/TaskTabContent';
import useTasksStore from '@modules/tasks/store';
import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const TaskTab = ({ type, isFirst, isLast }: { type: TaskType; isFirst?: boolean; isLast?: boolean }) => {
    const { activeTaskTab, setActiveTaskTab } = useTasksStore();

    return (
        <Button
            flex={1}
            size="$4"
            borderTopLeftRadius={isFirst ? '$4' : 0}
            borderTopRightRadius={isLast ? '$4' : 0}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            backgroundColor={activeTaskTab === type ? '$color5' : '$color2'}
            pressStyle={{ backgroundColor: '$color5', borderColor: '$color5' }}
            onPress={() => setActiveTaskTab(type)}
        >
            <SizableText>{type}</SizableText>
        </Button>
    );
};

const TaskSection = () => {
    const { activeTaskTab } = useTasksStore();
    const { dailyTasks } = useStore();
    const { completedTasks, specialTasks } = useTodayStore(
        (state) =>
            state.data[getDateKey(state.currentDate)] || {
                specialTasks: [],
                completedTasks: [],
            }
    );

    console.log(`[TaskSection][render] activeTaskTab=${activeTaskTab}`);

    return (
        <>
            <YStack
                flex={1}
                backgroundColor="$color5"
                borderRadius="$4"
                borderBottomLeftRadius={0}
            >
                <XStack>
                    <TaskTab
                        type={TaskType.DAILY}
                        isFirst
                    />
                    <TaskTab
                        type={TaskType.SPECIAL}
                        isLast
                    />
                </XStack>
                {activeTaskTab === TaskType.DAILY ? (
                    <TaskTabContent
                        type={TaskType.DAILY}
                        taskIds={dailyTasks}
                        completedTaskIds={completedTasks}
                    />
                ) : (
                    <TaskTabContent
                        type={TaskType.SPECIAL}
                        taskIds={specialTasks}
                        completedTaskIds={completedTasks}
                    />
                )}
            </YStack>
            <AddTaskDialog />
        </>
    );
};

export default TaskSection;
