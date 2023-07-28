import React from 'react';
import { Button, Label, XStack } from 'tamagui';
import { TaskType } from '@modules/tasks/types';

interface TaskTypeOptionProps {
    type: TaskType;
    selectedType: TaskType;
    onPress: (value: TaskType) => void;
    disabled: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}

const TaskTypeOption = ({
    type,
    selectedType,
    onPress,
    disabled,
    isFirst,
    isLast,
}: TaskTypeOptionProps) => {
    const selected = type === selectedType;

    return (
        <Button
            flex={1}
            size="$4"
            padding={0}
            onPress={() => onPress(type)}
            color={selected ? '$color1' : '$color'}
            backgroundColor={selected ? '$color8' : '$background'}
            borderTopRightRadius={isFirst ? 0 : '$4'}
            borderBottomRightRadius={isFirst ? 0 : '$4'}
            borderTopLeftRadius={isLast ? 0 : '$4'}
            borderBottomLeftRadius={isLast ? 0 : '$4'}
            disabled={disabled}
        >
            {type}
        </Button>
    );
};

interface TaskTypeSelectionProps {
    value: TaskType;
    onValueChange: (value: TaskType) => void;
    disabled: boolean;
}

const TaskTypeSelection = ({
    value,
    onValueChange,
    disabled,
}: TaskTypeSelectionProps) => {
    return (
        <XStack
            justifyContent="space-between"
            alignItems="center"
        >
            <Label flex={1}>Type</Label>
            <XStack
                flex={1}
                alignItems="center"
            >
                <TaskTypeOption
                    type={TaskType.DAILY}
                    selectedType={value}
                    onPress={onValueChange}
                    disabled={disabled}
                    isFirst
                />
                <TaskTypeOption
                    type={TaskType.SPECIAL}
                    selectedType={value}
                    onPress={onValueChange}
                    disabled={disabled}
                    isLast
                />
            </XStack>
        </XStack>
    );
};

export default TaskTypeSelection;
