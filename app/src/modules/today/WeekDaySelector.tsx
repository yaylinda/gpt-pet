import moment from 'moment';
import { SizableText, ToggleGroup } from 'tamagui';
import useStore from '@/store';
import { getDatesBetween } from '@/utils';
import useTodayStore from '@modules/today/store';

const getOpacity = (
    isBeforeUser: boolean,
    isBeforeToday: boolean,
    isToday: boolean,
    isCurrent: boolean
) => {
    if (isBeforeUser) {
        return 0;
    }

    if (isToday || isCurrent) {
        return 1;
    }

    if (isBeforeToday) {
        return 0.5;
    }

    return 0.75;
};

interface DayOptionProps {
    date: moment.Moment;
    isCurrent: boolean;
}

const DayOption = ({ date, isCurrent }: DayOptionProps) => {
    const dow = date.format('dd')[0];
    const dom = date.format('DD');

    const {} = useTodayStore();

    const isToday = date.isSame(moment(), 'day');

    const isBeforeToday = date.isBefore(moment(), 'day');

    const isBeforeUser = useStore(({ currentUser }) => {
        if (!currentUser) {
            return false;
        }
        return currentUser.createdAt.isAfter(date, 'day');
    });

    const opacity = getOpacity(isBeforeUser, isBeforeToday, isToday, isCurrent);
    const color = isCurrent ? '$color1' : isToday ? '$color9' : '$color';

    // return (
    //     <Button
    //         size="$4"
    //         paddingVertical="$0"
    //         paddingHorizontal="$2"
    //         space="$0"
    //         gap="$0"
    //         flexDirection="column"
    //         chromeless={!isCurrent}
    //         themeInverse={isCurrent}
    //         disabled={isBeforeUser}
    //         onPress={() => setCurrentDate(date)}
    //     >
    //         <SizableText
    //             size="$2"
    //             textAlign="center"
    //             opacity={opacity}
    //             color={color}
    //         >
    //             {dow}
    //         </SizableText>
    //         <SizableText
    //             textAlign="center"
    //             opacity={opacity}
    //             color={color}
    //         >
    //             {dom}
    //         </SizableText>
    //     </Button>
    // );

    return (
        <ToggleGroup.Item
            value={`${date.valueOf()}`}
            padding="$2"
            paddingTop="$2"
            paddingBottom="$2"
            paddingLeft="$2"
            paddingRight="$2"
            marginTop={0}
            marginBottom={0}
            display={'flex'}
            flex={1}
        >
            <SizableText size="$2">{dow}</SizableText>
            <SizableText size="$2">{dom}</SizableText>
        </ToggleGroup.Item>
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
    const days = getDatesBetween(
        moment(weekStartValue),
        moment(weekStartValue).endOf('week')
    );

    // console.log(
    //     `[WeekDaySelector] days=${JSON.stringify(
    //         days.map((d) => getDateKey(d))
    //     )}`
    // );

    // return (
    //     <XStack
    //         flex={1}
    //         justifyContent="space-between"
    //     >
    //         {days.map((d) => (
    //             <DayOption
    //                 key={`${d.valueOf()}_${currentDateValue}`}
    //                 date={d}
    //                 isCurrent={d.valueOf() === currentDateValue}
    //             />
    //         ))}
    //     </XStack>
    // );

    return (
        <ToggleGroup
            type="single"
            value={`${currentDateValue}`}
            size="$4"
            height={52}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            {days.map((d) => (
                <DayOption
                    key={`${d.valueOf()}_${currentDateValue}`}
                    date={d}
                    isCurrent={d.valueOf() === currentDateValue}
                />
            ))}
        </ToggleGroup>
    );
};

export default WeekDaySelector;
