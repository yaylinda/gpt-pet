import { Button, SizableText } from 'tamagui';
import type moment from 'moment/moment';
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

export default WeekDayOption;
