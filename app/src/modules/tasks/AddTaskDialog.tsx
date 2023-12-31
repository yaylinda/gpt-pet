import { X } from '@tamagui/lucide-icons';
import React from 'react';
import { Button, Dialog, Separator, SizableText, Spinner, Unspaced, XStack, YStack } from 'tamagui';
import useStore from '@/store';
import { formatDateHeader } from '@/utils';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import TaskDifficultySelection from '@modules/tasks/TaskDifficultySelection';
import TaskTypeSelection from '@modules/tasks/TaskTypeSelection';
import useTasksStore from '@modules/tasks/store';
import { TaskDifficulty, TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const AddTaskDialog = () => {
    const { userId } = useStore();
    const {
        taskDialog: { open },
        activeTaskTab,
        creating,
        createTask,
        closeTaskDialog,
    } = useTasksStore();

    const { currentDate } = useTodayStore();

    const [type, setType] = React.useState<TaskType>(activeTaskTab);
    const [title, setTitle] = React.useState<string>('');
    const [difficulty, setDifficulty] = React.useState<TaskDifficulty>(TaskDifficulty.S);

    React.useEffect(() => {
        setType(activeTaskTab);
    }, [activeTaskTab]);

    const onClose = () => {
        setType(activeTaskTab);
        setTitle('');
        setDifficulty(TaskDifficulty.S);
        closeTaskDialog();
    };

    const onSave = async () => {
        const success = await createTask(userId, currentDate, type!, title, difficulty);
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
                    <Dialog.Title size="$6">New Task</Dialog.Title>

                    <Separator />

                    <Dialog.Description>
                        {type === TaskType.DAILY ? (
                            <YStack>
                                <SizableText>A new task for everyday</SizableText>
                                <VerticalSpacer size="$0.5" />
                                <SizableText opacity={0.5}>Starts {formatDateHeader(currentDate)}</SizableText>
                            </YStack>
                        ) : (
                            <SizableText>A new special task for {formatDateHeader(currentDate)}</SizableText>
                        )}
                    </Dialog.Description>

                    <TextInputWithLabel
                        id="task_title"
                        value={title}
                        onUpdate={setTitle}
                        placeholder="Task Title"
                        disabled={creating}
                    />

                    <TaskTypeSelection
                        value={type}
                        onValueChange={setType}
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
                            disabled={!title || creating}
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
