import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import WeekDaySelector from '@modules/today/WeekDaySelector';
import useTodayStore from '@modules/today/store';

const DateHeader = () => {
    const { height } = useWindowDimensions();
    const { headerWeeks, currentDate, onScrolledToWeek } = useTodayStore();

    // console.log(
    //     `[DateHeader] currentDate=${getDateKey(
    //         currentDate
    //     )}, headerWeeks=${JSON.stringify(
    //         headerWeeks.map((d) => getDateKey(moment(d)))
    //     )}`
    // );

    return (
        <Carousel
            width={50} // TODO - don't hardcode
            height={height * 0.6 - 44} // TODO - don't hardcode
            style={{
                position: 'relative',
                bottom: 0,
            }}
            vertical={true}
            loop={false}
            autoPlay={false}
            data={headerWeeks}
            pagingEnabled={true}
            onSnapToItem={onScrolledToWeek}
            renderItem={({ item }) => (
                <WeekDaySelector
                    key={item}
                    weekStartValue={item}
                    currentDateValue={currentDate.valueOf()}
                />
            )}
        />
    );
};

export default DateHeader;
