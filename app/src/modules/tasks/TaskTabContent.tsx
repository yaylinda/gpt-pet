import React from 'react';
import { FlatList } from 'react-native';
import { Tabs } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskItem from '@modules/tasks/TaskItem';
// import FlatList = Animated.FlatList;

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
        <Tabs.Content
            value={type}
            flex={1}
            backgroundColor="$color5"
            // padding="$3"
        >
            <FlatList
                data={taskIds}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyTaskContent type={type} />}
            />
            {/*<ScrollView*/}
            {/*    contentContainerStyle={{ flex: 1, backgroundColor: 'green', padding: 50 }}*/}
            {/*    onTouchStart={() => console.log('on touch start!')}*/}
            {/*    onScrollBeginDrag={() => console.log('on begin drag!')}*/}
            {/*>*/}
            {/*    {taskIds.map((t, i) => renderItem({ item: t, index: i }))}*/}
            {/*</ScrollView>*/}
            {/*<ScrollView onTouchStart={() => console.log('on touch start!')}>*/}
            {/*    <EmptyTaskContent type={type} />*/}
            {/*</ScrollView>*/}
        </Tabs.Content>
    );
};

export default TaskTabContent;
