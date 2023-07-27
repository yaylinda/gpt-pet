import moment from 'moment';
import { SizableText, ToggleGroup } from 'tamagui';
import { getDatesBetween } from '@/utils';
import useTodayStore from '@modules/today/store';

interface DayOptionProps {
    date: moment.Moment;
}

const DayOption = ({ date }: DayOptionProps) => {
    const dow = date.format('dd')[0];
    const dom = date.format('DD');

    const { setCurrentDate } = useTodayStore();

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
            marginLeft={0}
            marginRight={0}
            display={'flex'}
            flex={1}
            onPress={() => setCurrentDate(date)}
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

    return (
        <ToggleGroup
            type="single"
            value={`${currentDateValue}`}
            size="$4"
            height={52} // TODO - do not hard code
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
                />
            ))}
        </ToggleGroup>
    );
};

export default WeekDaySelector;
