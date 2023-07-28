import React from 'react';
import { Button, Label, XStack } from 'tamagui';
import type { FontSizeTokens } from 'tamagui';
import { TaskDifficulty } from '@modules/tasks/types';

const TASK_DIFFICULTY_SIZE = {
    [TaskDifficulty.S]: '$2',
    [TaskDifficulty.M]: '$4',
    [TaskDifficulty.L]: '$6',
};

interface TaskDifficultyOptionProps {
    difficulty: TaskDifficulty;
    selectedDifficulty: TaskDifficulty;
    onPress: (value: TaskDifficulty) => void;
    disabled: boolean;
}

const TaskDifficultyOption = ({
    difficulty,
    selectedDifficulty,
    onPress,
    disabled,
}: TaskDifficultyOptionProps) => {
    const selected = difficulty === selectedDifficulty;

    // console.log(
    //     `[TaskDifficultyOption] difficulty=${difficulty}, selectedDifficulty=${selectedDifficulty}, selected=${selected}`
    // );

    return (
        <Button
            circular
            size={TASK_DIFFICULTY_SIZE[difficulty]}
            fontSize={TASK_DIFFICULTY_SIZE[difficulty] as FontSizeTokens}
            padding={0}
            onPress={() => onPress(difficulty)}
            color={selected ? '$color1' : '$color'}
            backgroundColor={selected ? '$color8' : '$background'}
            disabled={disabled}
        >
            {difficulty}
        </Button>
    );
};

interface TaskDifficultySelectionProps {
    value: TaskDifficulty;
    onValueChange: (value: TaskDifficulty) => void;
    disabled: boolean;
}

const TaskDifficultySelection = ({
    value,
    onValueChange,
    disabled,
}: TaskDifficultySelectionProps) => {
    console.log(`[TaskDifficultySelection] value=${value}`);

    return (
        <XStack
            justifyContent="space-between"
            alignItems="center"
        >
            <Label>Difficulty</Label>
            <XStack
                space
                alignItems="center"
            >
                <TaskDifficultyOption
                    difficulty={TaskDifficulty.S}
                    selectedDifficulty={value}
                    onPress={onValueChange}
                    disabled={disabled}
                />
                <TaskDifficultyOption
                    difficulty={TaskDifficulty.M}
                    selectedDifficulty={value}
                    onPress={onValueChange}
                    disabled={disabled}
                />
                <TaskDifficultyOption
                    difficulty={TaskDifficulty.L}
                    selectedDifficulty={value}
                    onPress={onValueChange}
                    disabled={disabled}
                />
            </XStack>
        </XStack>
    );
};

export default React.memo(
    TaskDifficultySelection,
    (prev, next) => prev.value === next.value && prev.disabled === next.disabled
);
