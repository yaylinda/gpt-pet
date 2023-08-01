import { difference } from 'lodash';
import React from 'react';
import { XStack, YStack } from 'tamagui';
import { getDateKey } from '@/utils';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';
import TaskTabButton from '@modules/tasks/TaskTabButton';
import TaskTabContent from '@modules/tasks/TaskTabContent';
import useTasksStore from '@modules/tasks/store';

import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const TaskSection = () => {
    const { currentDate, loadingDataCurrentDateKey, dailyTasks } = useTodayStore();
    const { completedTasks, specialTasks } = useTodayStore(
        (state) =>
            state.data[getDateKey(state.currentDate)] || {
                specialTasks: [],
                completedTasks: [],
            }
    );
    const { activeTaskTab } = useTasksStore();

    const taskIds = activeTaskTab === TaskType.DAILY ? dailyTasks : specialTasks;

    console.log(
        `[TaskSection][render] currentDate=${getDateKey(
            currentDate
        )}, loadingDataCurrentDateKey=${loadingDataCurrentDateKey}, activeTaskTab=${activeTaskTab}, dailyTasks=${
            dailyTasks.length
        }, completedTasks=${completedTasks.length}, specialTasks=${specialTasks.length}`
    );

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
                {!loadingDataCurrentDateKey && (
                    <TaskTabContent
                        type={activeTaskTab}
                        incompleteTaskIds={difference(taskIds, completedTasks)}
                        completeTaskIds={completedTasks}
                    />
                )}
            </YStack>
            <AddTaskDialog />
        </>
    );
};

export default TaskSection;
