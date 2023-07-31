import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SequencedTransition } from 'react-native-reanimated';
import type { TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';
import useTasksStore from '@modules/tasks/store';
import useTodayStore from '@modules/today/store';

interface TaskTabContentProps {
    type: TaskType;
    taskIds: string[];
    completedTaskIds: string[];
}

const TaskTabContent = ({ type, taskIds, completedTaskIds }: TaskTabContentProps) => {
    const { activeTaskTab } = useTasksStore();
    const { taskListRef } = useTodayStore();

    if (type !== activeTaskTab) {
        console.log(`[TaskTabContent][render] type=${type}, rendering null...`);
        return null;
    }

    console.log(`[TaskTabContent][render] type=${type}, taskIds=${JSON.stringify(taskIds)}`);

    const renderItem = ({ item }: { item: string; index: number }) => (
        <TaskItem
            key={item}
            taskId={item}
            completed={completedTaskIds.includes(item)}
        />
    );

    return (
        <GestureHandlerRootView>
            <Animated.FlatList
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                ref={taskListRef}
                layout={SequencedTransition}
                style={{
                    padding: 13, // $3
                    borderBottomRightRadius: 9, // $4
                }}
                data={taskIds}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyTaskContent type={type} />}
            />
        </GestureHandlerRootView>
    );
};

export default React.memo(
    TaskTabContent,
    (prev, next) =>
        prev.type === next.type &&
        prev.taskIds.length === next.taskIds.length &&
        prev.completedTaskIds.length === next.taskIds.length
);
