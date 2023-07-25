import { SizableText, Tabs } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';

interface TaskTabContentProps {
    type: TaskType;
}

const TaskTabContent = ({ type }: TaskTabContentProps) => {
    return (
        <Tabs.Content value={type}>
            <SizableText>{type}</SizableText>
        </Tabs.Content>
    );
};

export default TaskTabContent;
