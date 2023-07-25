import { Separator, SizableText, Tabs } from 'tamagui';
import AddTaskDialog from '@modules/tasks/AddTaskDialog';
import TaskTabContent from '@modules/tasks/TaskTabContent';
import { TaskType } from '@modules/tasks/types';

const TaskTab = ({ value }: { value: TaskType }) => {
    return (
        <Tabs.Tab
            flex={1}
            value={value}
        >
            <SizableText>{value}</SizableText>
        </Tabs.Tab>
    );
};

const TaskSection = () => {
    return (
        <>
            <Tabs
                flex={3}
                defaultValue={TaskType.DAILY}
                orientation="horizontal"
                flexDirection="column"
                borderRadius="$4"
                borderWidth="$0.25"
                overflow="hidden"
                borderColor="$borderColor"
            >
                <Tabs.List
                    separator={<Separator vertical />}
                    disablePassBorderRadius="bottom"
                >
                    <TaskTab value={TaskType.DAILY} />
                    <TaskTab value={TaskType.SPECIAL} />
                </Tabs.List>
                <Separator />
                <TaskTabContent type={TaskType.DAILY} />
                <TaskTabContent type={TaskType.SPECIAL} />
            </Tabs>
            <AddTaskDialog />
        </>
    );
};

export default TaskSection;
