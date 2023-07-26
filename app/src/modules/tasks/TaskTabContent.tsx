import React from 'react';
import { FlatList } from 'react-native';
import { Tabs } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';
import useTasksStore from '@modules/tasks/store';

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
    const {} = useTasksStore();

    const renderItem = ({ item }: { item: string; index: number }) => (
        <TaskItem
            key={item}
            taskId={item}
            completed={completedTaskIds.includes(item)}
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
                data={taskIds}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyTaskContent type={type} />}
            />
        </Tabs.Content>
    );
};

export default TaskTabContent;
