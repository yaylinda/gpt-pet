import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { Button, SizableText, Tabs, YStack } from 'tamagui';
import type { Task } from '@modules/tasks/types';
import VerticalSpacer from '@common/VerticalSpacer';
import usePetsStore from '@modules/pets/store';
import TaskItem from '@modules/tasks/TaskItem';
import { TASK_TYPE_FIELD } from '@modules/tasks/constants';
import useTasksStore from '@modules/tasks/store';
import { TaskType } from '@modules/tasks/types';

const getEmptyText = (type: TaskType, petName: string) => {
    switch (type) {
        case TaskType.DAILY:
            return (
                'Track tasks that you need to complete every day.\n\n' +
                'No matter how small or mundane, each time you complete a task, you\'ll be rewarded!\n\n' +
                'Don\'t worry about incomplete Daily Tasks. All Daily Tasks will be rolled-over to the next dat.'
            );
        case TaskType.SPECIAL:
            return (
                'Need to conquer a special quest today? Track them here!\n\n' +
                `Even if no one recognizes your accomplishment, ${petName} will always be there\n\n` +
                'Use the coins you earn from completing tasks to buy food and treats for your lil\' buddy!'
            );
    }
};

const renderEmptyText = (width: number, type: TaskType, petName: string) => {
    return (
        <YStack
            height={'100%'}
            justifyContent="center"
            alignItems={'center'}
        >
            <VerticalSpacer />

            <SizableText
                size={'$2'}
                color="$color7"
                width={width * 0.5}
            >
                {getEmptyText(type, petName)}
            </SizableText>

            <VerticalSpacer size="$2" />

            <Button
                size="$4"
                icon={Plus}
            >
                Add A Task
            </Button>
        </YStack>
    );
};

interface TaskTabContentProps {
    type: TaskType;
}

const TaskTabContent = ({ type }: TaskTabContentProps) => {
    const { width } = useWindowDimensions();
    const petName = usePetsStore((state) => state.pets[0].displayName);

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
                ListEmptyComponent={renderEmptyText(width, type, petName)}
            />
        </Tabs.Content>
    );
};

export default TaskTabContent;
