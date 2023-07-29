import React from 'react';
import { SizableText, Tabs } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';

import TaskTabContent from '@modules/tasks/TaskTabContent';
import useTasksStore from '@modules/tasks/store';
import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const TaskTab = ({ value }: { value: TaskType }) => {
    return (
        <Tabs.Tab
            flex={1}
            value={value}
            pressStyle={{ backgroundColor: '$color5' }}
        >
            <SizableText>{value}</SizableText>
        </Tabs.Tab>
    );
};

const TaskSection = () => {
    const { dailyTasks } = useStore();
    const { specialTasks, completedTasks } = useTodayStore(
        (state) =>
            state.data[getDateKey(state.currentDate)] || {
                specialTasks: [],
                completedTasks: [],
            }
    );

    const { activeTaskTab, setActiveTaskTab } = useTasksStore();

    console.log('[TaskSection][render]');

    return (
        <>
            <Tabs
                flex={1}
                value={activeTaskTab}
                onValueChange={(value) => setActiveTaskTab(value as TaskType)}
                orientation="horizontal"
                flexDirection="column"
                borderRadius="$4"
                borderWidth={0}
                overflow="scroll"
                borderColor="$borderColor"
                borderBottomLeftRadius={0}
                borderBottomRightRadius="$4"
                pressStyle={{ backgroundColor: '$color5' }}
            >
                <Tabs.List disablePassBorderRadius="bottom">
                    <TaskTab
                        key={TaskType.DAILY}
                        value={TaskType.DAILY}
                    />
                    <TaskTab
                        key={TaskType.SPECIAL}
                        value={TaskType.SPECIAL}
                    />
                </Tabs.List>
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
            </Tabs>
            <AddTaskDialog />
        </>
    );
};

export default TaskSection;
