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
            size="$4"
            icon={Plus}
            onPress={() => openTaskDialog(type)}
        >
            Add A Task
        </Button>
    );
};

export default AddTaskButton;
