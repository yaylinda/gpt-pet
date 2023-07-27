import { X } from '@tamagui/lucide-icons';
import React from 'react';
import { Button, Dialog, Separator, Spinner, Unspaced, XStack } from 'tamagui';
import TextInputWithLabel from '@common/TextInputWithLabel';
import TaskDifficultySelection from '@modules/tasks/TaskDifficultySelection';
import useTasksStore from '@modules/tasks/store';
import { TaskDifficulty } from '@modules/tasks/types';

const AddTaskDialog = () => {
    const {
        taskDialog: { open, type },
        creating,
        createTask,
        closeTaskDialog,
    } = useTasksStore();

    const [title, setTitle] = React.useState<string>('');
    const [difficulty, setDifficulty] = React.useState<TaskDifficulty>(
        TaskDifficulty.S
    );

    const onClose = () => {
        setTitle('');
        setDifficulty(TaskDifficulty.M);
        closeTaskDialog();
    };

    const onSave = async () => {
        const success = await createTask(type!, title, difficulty);
        if (success) {
            onClose();
        }
    };

    return (
        <Dialog
            modal
            open={open}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    onPress={onClose}
                />

                <Dialog.Content
                    width="90%"
                    bordered
                    elevate
                    key="content"
                    animateOnly={['transform', 'opacity']}
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    space
                >
                    <Dialog.Title size="$6">New {type} Task</Dialog.Title>

                    <Separator />

                    <TextInputWithLabel
                        id="task_title"
                        value={title}
                        onUpdate={setTitle}
                        placeholder="Task Title"
                        disabled={creating}
                    />

                    <TaskDifficultySelection
                        value={difficulty}
                        onValueChange={setDifficulty}
                        disabled={creating}
                    />

                    <Separator />

                    <XStack justifyContent="space-between">
                        <Button
                            size="$4"
                            onPress={onClose}
                            bordered
                            backgroundColor="$backgroundTransparent"
                            borderColor="$background"
                            borderWidth="$1"
                            disabled={creating}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="$4"
                            onPress={onSave}
                            disabled={creating}
                            icon={creating ? () => <Spinner /> : undefined}
                        >
                            Save
                        </Button>
                    </XStack>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position="absolute"
                                top="$4"
                                right="$4"
                                size="$2"
                                circular
                                icon={X}
                                onPress={closeTaskDialog}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

export default AddTaskDialog;
