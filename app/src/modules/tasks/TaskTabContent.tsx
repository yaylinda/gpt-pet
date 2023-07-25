import React from 'react';
import { FlatList } from 'react-native';
import { Tabs } from 'tamagui';
import type { Task, TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';
import { TASK_TYPE_FIELD } from '@modules/tasks/constants';
import useTasksStore from '@modules/tasks/store';

interface TaskTabContentProps {
    type: TaskType;
}

const TaskTabContent = ({ type }: TaskTabContentProps) => {
    const tasks = useTasksStore((state) => {
        const field = TASK_TYPE_FIELD[type];
        return Object.values(state[field]);
    });

    const renderItem = ({ item }: { item: Task; index: number }) => (
        <TaskItem
            key={item.id}
            task={item}
        />
    );

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
                data={tasks}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyTaskContent type={type} />}
            />
        </Tabs.Content>
    );
};

export default TaskTabContent;
