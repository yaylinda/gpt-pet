import moment from 'moment';
import React from 'react';
import { FlatList } from 'react-native';
import { Tabs } from 'tamagui';
import AddTaskButton from '@modules/tasks/AddTaskButton';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';
import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

interface TaskTabContentProps {
    type: TaskType;
    taskIds: string[];
    completedTaskIds: string[];
}

const TaskTabContent = ({
    type,
    taskIds,
    completedTaskIds,
}: TaskTabContentProps) => {
    const { currentDate } = useTodayStore();

    const showAdd =
        currentDate.isSame(moment(), 'day') ||
        (type === TaskType.SPECIAL &&
            currentDate.isSameOrAfter(moment(), 'day'));

    const renderItem = ({ item }: { item: string; index: number }) => (
        <TaskItem
            key={item}
            taskId={item}
            completed={completedTaskIds.includes(item)}
        />
    );

    console.log(`[TaskTabContent][render] type=${type}, taskIds=${taskIds}`);

    return (
        <Tabs.Content
            value={type}
            flex={1}
            backgroundColor="$background"
            borderColor="$background"
            borderRadius="$2"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth="$2"
        >
            <FlatList
                data={taskIds}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyTaskContent type={type} />}
            />
            {showAdd && <AddTaskButton type={type} />}
        </Tabs.Content>
    );
};

export default TaskTabContent;
