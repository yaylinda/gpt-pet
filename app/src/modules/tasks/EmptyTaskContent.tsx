import moment from 'moment/moment';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { SizableText, YStack } from 'tamagui';
import VerticalSpacer from '@common/VerticalSpacer';
import AddTaskButton from '@modules/tasks/AddTaskButton';
import { TaskType } from '@modules/tasks/types';
import useTodayStore from '@modules/today/store';

const getEmptyText = (type: TaskType, petName: string) => {
    switch (type) {
        case TaskType.DAILY:
            return (
                'Track tasks that you need to complete every day.\n\n' +
                `No matter how small or mundane, each time you complete a task, you (and ${petName}) will be rewarded!`
            );
        case TaskType.SPECIAL:
            return (
                'Need to conquer a special quest?\n\n' +
                'Track them here!\n\n' +
                'Who knows? Maybe Special Quest = Special Reward!'
            );
    }
};

interface EmptyTaskContentProps {
    type: TaskType;
}

const EmptyTaskContent = ({ type }: EmptyTaskContentProps) => {
    const { width } = useWindowDimensions();

    const { currentDate, pet } = useTodayStore();

    const petName = pet ? pet.displayName : 'your pet';

    const content = React.useMemo(() => {
        if (currentDate.isBefore(moment(), 'day')) {
            return (
                <SizableText
                    size={'$2'}
                    color="$color7"
                    textAlign="center"
                >
                    {'Nothin\' here!'}
                </SizableText>
            );
        }

        return (
            <>
                <SizableText
                    size={'$2'}
                    color="$color7"
                >
                    {getEmptyText(type, petName)}
                </SizableText>

                <VerticalSpacer size="$2" />

                <AddTaskButton type={type} />
            </>
        );
    }, [currentDate, type, petName]);

    return (
        <YStack
            height={'100%'}
            justifyContent="center"
            alignItems={'center'}
            paddingHorizontal={width * 0.2}
        >
            <VerticalSpacer />
            {content}
        </YStack>
    );
};

export default EmptyTaskContent;
