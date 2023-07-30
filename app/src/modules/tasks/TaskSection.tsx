import React from 'react';
import { XStack, YStack } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';
import TaskTabButton from '@modules/tasks/TaskTabButton';
import TaskTabContent from '@modules/tasks/TaskTabContent';

import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const TaskSection = () => {
    const { dailyTasks } = useStore();
    const { completedTasks, specialTasks } = useTodayStore(
        (state) =>
            state.data[getDateKey(state.currentDate)] || {
                specialTasks: [],
                completedTasks: [],
            }
    );

    console.log('[TaskSection][render]');

    return (
        <>
            <YStack
                flex={1}
                backgroundColor="$color5"
                borderRadius="$4"
                borderBottomLeftRadius={0}
            >
                <XStack>
                    <TaskTabButton
                        type={TaskType.DAILY}
                        isFirst
                    />
                    <TaskTabButton
                        type={TaskType.SPECIAL}
                        isLast
                    />
                </XStack>
                <TaskTabContent
                    type={TaskType.DAILY}
                    taskIds={dailyTasks}
                    completedTaskIds={completedTasks}
                />
                <TaskTabContent
                    type={TaskType.SPECIAL}
                    taskIds={specialTasks}
                    completedTaskIds={completedTasks}
                />
            </YStack>
            <AddTaskDialog />
        </>
    );
};

export default TaskSection;
