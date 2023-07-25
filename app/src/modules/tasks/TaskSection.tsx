import { Separator, SizableText, Tabs } from 'tamagui';
import TaskTabContent from '@modules/tasks/TaskTabContent';
import { TaskType } from '@modules/tasks/types';
import DateHeader from '@modules/today/DateHeader';

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
            <DateHeader />
            <Tabs
                flex={1}
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
        </>
    );
};

export default TaskSection;
