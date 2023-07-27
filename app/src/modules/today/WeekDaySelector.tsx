import moment from 'moment';
import { YStack } from 'tamagui';
import { getDatesBetween } from '@/utils';
import WeekDayOption from '@modules/today/WeekDayOption';

interface WeekDaySelectorProps {
    weekStartValue: number;
    currentDateValue: number;
}

const WeekDaySelector = ({
    weekStartValue,
    currentDateValue,
}: WeekDaySelectorProps) => {
    const days = getDatesBetween(
        moment(weekStartValue),
        moment(weekStartValue).endOf('week')
    );

    return (
        <YStack
            display="flex"
            flex={1}
        >
            {days.map((d, index) => (
                <WeekDayOption
                    key={`${d.valueOf()}_${currentDateValue}`}
                    date={d}
                    isFirst={index === 0}
                    isLast={index === days.length - 1}
                />
            ))}
        </YStack>
    );
};

export default WeekDaySelector;
