import { ListItem } from 'tamagui';
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
        <ListItem
            size="$3"
            pressTheme
            title={task.title}
            subTitle={`${task.difficulty} (${task.emoji})`}
        />
    );
};

export default TaskItem;
