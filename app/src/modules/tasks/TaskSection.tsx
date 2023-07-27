import React from 'react';
import { Separator, SizableText, Tabs } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';
import TaskTabContent from '@modules/tasks/TaskTabContent';
import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const TaskTab = ({ value }: { value: TaskType }) => {
    return (
        <Tabs.Tab
            flex={1}
            value={value}
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

    console.log('[TaskSection][render]');

    return (
        <>
            <Tabs
                flex={1}
                defaultValue={TaskType.DAILY}
                orientation="horizontal"
                flexDirection="column"
                borderRadius="$4"
                borderWidth="$0.25"
                overflow="hidden"
                borderColor="$borderColor"
                borderBottomLeftRadius={0}
                borderBottomRightRadius="$4"
            >
                <Tabs.List
                    separator={<Separator vertical />}
                    disablePassBorderRadius="bottom"
                >
                    <TaskTab value={TaskType.DAILY} />
                    <TaskTab value={TaskType.SPECIAL} />
                </Tabs.List>
                <Separator />
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
