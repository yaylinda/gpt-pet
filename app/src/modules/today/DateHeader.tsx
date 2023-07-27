import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import WeekDaySelector from '@modules/today/WeekDaySelector';
import useTodayStore from '@modules/today/store';

const DateHeader = () => {
    const { width } = useWindowDimensions();
    const { headerWeeks, currentDate, onScrolledToWeek } = useTodayStore();

    const showPrev = useStore(({ currentUser }) => {
        if (!currentUser) {
            return false;
        }
        return currentDate.isSameOrAfter(currentUser.createdAt);
    });

    console.log(
        `[DateHeader] currentDate=${getDateKey(
            currentDate
        )}, headerWeeks=${JSON.stringify(
            headerWeeks.map((d) => getDateKey(moment(d)))
        )}`
    );

    return (
        <Carousel
            width={width - 18 * 2} // TODO - don't hardcode
            height={44} // TODO - don't hardcode
            style={{ display: 'flex', position: 'relative' }}
            vertical={false}
            loop={false}
            autoPlay={false}
            data={headerWeeks}
            pagingEnabled={true}
            onSnapToItem={onScrolledToWeek}
            renderItem={({ item }) => (
                <WeekDaySelector
                    key={item}
                    weekStartValue={item}
                />
            )}
        />
    );
};

export default DateHeader;
