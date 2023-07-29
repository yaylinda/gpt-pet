import React from 'react';
import { FlatList } from 'react-native';
import type { TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';

interface TaskTabContentProps {
    type: TaskType;
    taskIds: string[];
    completedTaskIds: string[];
}

const TaskTabContent = ({ type, taskIds, completedTaskIds }: TaskTabContentProps) => {
    const renderItem = ({ item }: { item: string; index: number }) => (
        <TaskItem
            key={item}
            taskId={item}
            completed={completedTaskIds.includes(item)}
        />
    );

    console.log(`[TaskTabContent][render] type=${type}, taskIds=${JSON.stringify(taskIds)}`);

    return (
        <FlatList
            style={{
                borderBottomRightRadius: 9,
            }}
            data={taskIds}
            renderItem={renderItem}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={<EmptyTaskContent type={type} />}
            onTouchStart={() => console.log('on touch start!')}
            onScrollBeginDrag={() => console.log('on begin drag!')}
        />
    );
};

export default TaskTabContent;
