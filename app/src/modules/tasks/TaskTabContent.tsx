import { isEmpty } from 'lodash';
import React from 'react';
import { ScrollView } from 'tamagui';
import type { TaskType } from '@modules/tasks/types';
import EmptyTaskContent from '@modules/tasks/EmptyTaskContent';
import TaskList from '@modules/tasks/TaskList';

interface TaskTabContentProps {
    type: TaskType;
    incompleteTaskIds: string[];
    completeTaskIds: string[];
}

const TaskTabContent = ({ type, incompleteTaskIds, completeTaskIds }: TaskTabContentProps) => {
    console.log(
        `[TaskTabContent][render] type=${type}, incompleteTaskIds=${incompleteTaskIds.length}, completeTaskIds=${completeTaskIds.length}`
    );

    return (
        <ScrollView
            paddingHorizontal="$3"
            borderBottomRightRadius="$4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 13 /* $3 */ }}
            space
        >
            {isEmpty(incompleteTaskIds) && isEmpty(completeTaskIds) ? (
                <EmptyTaskContent type={type} />
            ) : (
                <TaskList
                    headerText="TODO"
                    taskIds={incompleteTaskIds}
                />
            )}
            {!isEmpty(completeTaskIds) && (
                <TaskList
                    headerText="Completed"
                    taskIds={completeTaskIds}
                    completed
                />
            )}
        </ScrollView>
    );
};

export default React.memo(
    TaskTabContent,
    (prev, next) =>
        prev.type === next.type &&
        prev.incompleteTaskIds.length === next.incompleteTaskIds.length &&
        prev.completeTaskIds.length === next.completeTaskIds.length
);
