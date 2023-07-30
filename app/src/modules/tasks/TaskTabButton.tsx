import React from 'react';
import { Button, SizableText } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';
import useTasksStore from '@modules/tasks/store';

interface TaskTabButtonProps {
    type: TaskType;
    isFirst?: boolean;
    isLast?: boolean;
}

const TaskTabButton = ({ type, isFirst, isLast }: TaskTabButtonProps) => {
    const { activeTaskTab, setActiveTaskTab } = useTasksStore();

    return (
        <Button
            flex={1}
            size="$4"
            borderTopLeftRadius={isFirst ? '$4' : 0}
            borderTopRightRadius={isLast ? '$4' : 0}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            backgroundColor={activeTaskTab === type ? '$color5' : '$color2'}
            pressStyle={{ backgroundColor: '$color5', borderColor: '$color5' }}
            onPress={() => setActiveTaskTab(type)}
        >
            <SizableText>{type}</SizableText>
        </Button>
    );
};

export default TaskTabButton;
