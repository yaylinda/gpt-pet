import { ListItem } from 'tamagui';
import useTasksStore from '@modules/tasks/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId }: TaskItemProps) => {
    const task = useTasksStore((state) => state.tasks[taskId]);

    return (
        <ListItem
            size="$3"
            pressTheme
            title={task.title}
            subTitle={task.difficulty}
        />
    );
};

export default TaskItem;
