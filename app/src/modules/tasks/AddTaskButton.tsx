import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { Button } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';
import useTasksStore from '@modules/tasks/store';

interface AddTaskButtonProps {
    type: TaskType;
}

const AddTaskButton = ({ type }: AddTaskButtonProps) => {
    const { openTaskDialog } = useTasksStore();
    return (
        <Button
            elevate
            circular
            themeInverse
            size="$4"
            position="absolute"
            bottom={0}
            right={0}
            icon={Plus}
            scaleIcon={2}
            onPress={() => openTaskDialog(type)}
        />
    );
};

export default AddTaskButton;
