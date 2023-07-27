import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import { Button, SizableText, YStack } from 'tamagui';
import { getDatesBetween } from '@/utils';
import useTodayStore from '@modules/today/store';

interface DayOptionProps {
    date: moment.Moment;
    isFirst: boolean;
    isLast: boolean;
}

const DayOption = ({ date, isFirst, isLast }: DayOptionProps) => {
    const dow = date.format('ddd');
    const dom = date.format('DD');

    const { currentDate, setCurrentDate } = useTodayStore();

    const isToday = date.isSame(currentDate, 'day');

    return (
        <Button
            size="$4"
            flexDirection="column"
            flex={1}
            space={0}
            padding={0}
            gap={0}
            borderRadius={0}
            borderTopLeftRadius={isFirst ? '$4' : 0}
            borderBottomLeftRadius={isLast ? '$4' : 0}
            borderWidth="$0.25"
            borderColor="$background"
            backgroundColor={isToday ? '$color5' : '$color2'}
            onPress={() => setCurrentDate(date)}
        >
            <SizableText size="$2">{dow}</SizableText>
            <SizableText size="$2">{dom}</SizableText>
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
    const { height } = useWindowDimensions();

    const days = getDatesBetween(
        moment(weekStartValue),
        moment(weekStartValue).endOf('week')
    );

    // return (
    //     <ToggleGroup
    //         orientation="vertical"
    //         type="single"
    //         value={`${currentDateValue}`}
    //         size="$4"
    //         height={height * 0.6 - 44} // TODO - do not hard code
    //         borderTopLeftRadius={0}
    //         style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'center',
    //         }}
    //     >
    //         {days.map((d) => (
    //             <DayOption
    //                 key={`${d.valueOf()}_${currentDateValue}`}
    //                 date={d}
    //             />
    //         ))}
    //     </ToggleGroup>
    // );

    return (
        <YStack
            height={height * 0.6 - 44}
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
