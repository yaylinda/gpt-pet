import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import { Button, SizableText, YStack } from 'tamagui';
import useStore from '@/store';
import { getDatesBetween } from '@/utils';
import useTodayStore from '@modules/today/store';

interface DayOptionProps {
    date: moment.Moment;
    isFirst: boolean;
    isLast: boolean;
}

const DayOption = ({ date }: DayOptionProps) => {
    const dow = date.format('ddd');
    const dom = date.format('DD');

    const { currentDate, setCurrentDate } = useTodayStore();

    const isCurrentDate = date.isSame(currentDate, 'day');

    const isBeforeUser = useStore((state) =>
        state.currentUser
            ? state.currentUser.createdAt.isAfter(date, 'day')
            : true
    );

    const textOpacity = isBeforeUser ? 0 : 1;

    return (
        <Button
            size="$4"
            flexDirection="column"
            flex={1}
            space={0}
            padding={0}
            gap={0}
            borderRadius={0}
            borderWidth="$0.25"
            borderColor="$background"
            backgroundColor={isCurrentDate ? '$color5' : '$color2'}
            onPress={() => setCurrentDate(date)}
            disabled={isBeforeUser}
        >
            <SizableText
                size="$1"
                opacity={textOpacity}
            >
                {dow}
            </SizableText>
            <SizableText
                size="$1"
                opacity={textOpacity}
            >
                {dom}
            </SizableText>
        </Button>
    );
};

interface WeekDaySelectorProps {
    weekStartValue: number;
    currentDateValue: number;
}

const WeekDaySelector = ({
    weekStartValue,
    currentDateValue,
}: WeekDaySelectorProps) => {
    const {} = useWindowDimensions();

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
                <DayOption
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
