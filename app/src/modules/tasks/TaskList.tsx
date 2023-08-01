import React from 'react';
import Animated, { SequencedTransition } from 'react-native-reanimated';
import { SizableText, View, XStack } from 'tamagui';
import { getDateKey } from '@/utils';
import VerticalSpacer from '@common/VerticalSpacer';
import TaskItem from '@modules/tasks/TaskItem';
import useTodayStore from '@modules/today/store';

interface TaskListHeaderProps {
    headerText: string;
}

const TaskListHeader = ({ headerText }: TaskListHeaderProps) => {
    return (
        <XStack
            justifyContent="space-between"
            alignItems="center"
            space
        >
            <View
                height={1}
                flex={1}
                backgroundColor="$color6"
            />
            <SizableText color="$color7">{headerText}</SizableText>
            <View
                height={1}
                flex={1}
                backgroundColor="$color6"
            />
        </XStack>
    );
};

interface TaskListProps {
    headerText: string;
    taskIds: string[];
    completed?: boolean;
}

const TaskList = ({ headerText, taskIds, completed = false }: TaskListProps) => {
    const currentDateKey = useTodayStore((state) => getDateKey(state.currentDate));

    console.log(`[TaskList][render] headerText=${headerText}, taskIds=${taskIds.length}, completed=${completed}`);

    return (
        <Animated.View layout={SequencedTransition}>
            <TaskListHeader headerText={headerText} />
            <VerticalSpacer size="$0.75" />
            {taskIds.map((t) => (
                <TaskItem
                    key={`${t}_${currentDateKey}`}
                    taskId={t}
                    completed={completed}
                />
            ))}
        </Animated.View>
    );
};

export default TaskList;
