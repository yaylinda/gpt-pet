import { SizableText, Tabs } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';

interface TaskTabContentProps {
    type: TaskType;
}

const TaskTabContent = ({ type }: TaskTabContentProps) => {
    return (
        <Tabs.Content
            value={type}
            flex={1}
            backgroundColor="$background"
            borderColor="$background"
            borderRadius="$2"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderWidth="$2"
        >
            <SizableText>{type}</SizableText>
        </Tabs.Content>
    );
};

export default TaskTabContent;
