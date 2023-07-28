import moment from 'moment/moment';
import { Button, SizableText } from 'tamagui';
import useStore from '@/store';
import useTodayStore from '@modules/today/store';

interface WeekDayOptionProps {
    date: moment.Moment;
    isFirst: boolean;
    isLast: boolean;
}

const WeekDayOption = ({ date }: WeekDayOptionProps) => {
    const dow = date.format('ddd');
    const dom = date.format('DD');

    const isBeforeToday = date.isBefore(moment(), 'day');

    const isToday = date.isSame(moment(), 'day');

    const { currentDate, setCurrentDate } = useTodayStore();

    const isCurrentDate = date.isSame(currentDate, 'day');

    const isBeforeUser = useStore((state) =>
        state.currentUser
            ? state.currentUser.createdAt.isAfter(date, 'day')
            : true
    );

    const textOpacity = isBeforeUser ? 0 : isBeforeToday ? 0.7 : 1;

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
            borderRightWidth={0}
            borderColor="$background"
            backgroundColor={isCurrentDate ? '$color5' : '$color2'}
            pressStyle={{
                backgroundColor: '$color5',
                borderColor: '$background',
            }}
            onPress={() => setCurrentDate(date)}
            disabled={isBeforeUser}
        >
            <SizableText
                size={isToday ? '$1.5' : '$1'}
                opacity={textOpacity}
                color={isToday ? '$colorFocus' : '$color'}
            >
                {dow}
            </SizableText>
            <SizableText
                size={isToday ? '$1.5' : '$1'}
                opacity={textOpacity}
                color={isToday ? '$colorFocus' : '$color'}
            >
                {dom}
            </SizableText>
        </Button>
    );
};

export default WeekDayOption;
