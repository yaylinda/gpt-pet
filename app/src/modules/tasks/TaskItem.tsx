import { ListItem } from 'tamagui';
import useTasksStore from '@modules/tasks/store';

interface TaskItemProps {
    taskId: string;
    completed: boolean;
}

const TaskItem = ({ taskId  }: TaskItemProps) => {
    const task = useTasksStore((state) => state.tasks[taskId]);

    return (
        <ListItem
            pressTheme
            title={task.title}
        />
    );
};

export default TaskItem;
