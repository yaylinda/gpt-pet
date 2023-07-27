import moment from 'moment';
import { Button, SizableText, XStack } from 'tamagui';
import useStore from '@/store';
import { getDateKey, getDatesBetween } from '@/utils';

interface DayOptionProps {
    date: moment.Moment;
}

const DayOption = ({ date }: DayOptionProps) => {
    const dow = date.format('dd')[0];
    const dom = date.format('DD');

    const show = useStore(({ currentUser }) => {
        if (!currentUser) {
            return false;
        }
        return date.isSameOrAfter(currentUser.createdAt, 'day');
    });

    return (
        <Button
            size="$4"
            paddingVertical="$0"
            paddingHorizontal="$2"
            flexDirection="column"
            justifyContent="space-between"
            chromeless
            disabled={!show}
        >
            <SizableText textAlign="center">{dow}</SizableText>
            <SizableText textAlign="center">{dom}</SizableText>
        </Button>
    );
};

interface WeekDaySelectorProps {
    weekStartValue: number;
}

const WeekDaySelector = ({ weekStartValue }: WeekDaySelectorProps) => {
    const days = getDatesBetween(
        moment(weekStartValue),
        moment(weekStartValue).endOf('week')
    );

    console.log(
        `[WeekDaySelector] days=${JSON.stringify(
            days.map((d) => getDateKey(d))
        )}`
    );

    return (
        <XStack
            flex={1}
            justifyContent="space-between"
        >
            {days.map((d) => (
                <DayOption
                    key={d.valueOf()}
                    date={d}
                />
            ))}
        </XStack>
    );
};

export default WeekDaySelector;
