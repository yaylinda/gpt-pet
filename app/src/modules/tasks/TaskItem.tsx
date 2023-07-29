import { SizableText, XGroup } from 'tamagui';
import useTasksStore from '@modules/tasks/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId }: TaskItemProps) => {
    const task = useTasksStore((state) => state.tasks[taskId]);

    if (!task) {
        return null;
    }

    return (
        <XGroup
            size="$4"
            justifyContent="flex-start"
            alignItems="center"
            marginVertical="$1.5"
            padding="$2"
            borderRadius="$10"
            borderColor="$color6"
            borderWidth="$2"
            borderStyle="solid"
            gap="$1.5"
        >
            <SizableText>{task.emoji}</SizableText>
            {/*<Circle backgroundColor="$color12" />*/}
            <SizableText>{task.title}</SizableText>
        </XGroup>
    );
};

export default TaskItem;
