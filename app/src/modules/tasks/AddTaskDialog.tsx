import { X } from '@tamagui/lucide-icons';
import { Button, Dialog, Unspaced } from 'tamagui';
import useTasksStore from '@modules/tasks/store';

const AddTaskDialog = () => {
    const {
        taskDialog: {  open },
        
        closeTaskDialog,
    } = useTasksStore();

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
                    onPress={closeTaskDialog}
                />

                <Dialog.Content
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
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description>
                        Make changes to your profile here. Click save when
                        you&#39;re done.
                    </Dialog.Description>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position="absolute"
                                top="$3"
                                right="$3"
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
