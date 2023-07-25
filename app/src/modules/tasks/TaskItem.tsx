import { ListItem } from 'tamagui';
import type { Task } from '@modules/tasks/types';

interface TaskItemProps {
    task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <ListItem
            pressTheme
            title={task.title}
        />
    );
};

export default TaskItem;
