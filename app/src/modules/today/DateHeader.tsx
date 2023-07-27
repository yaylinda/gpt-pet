import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { XStack } from 'tamagui';
import useStore from '@/store';
import { getDateKey } from '@/utils';
import WeekDaySelector from '@modules/today/WeekDaySelector';
import useTodayStore from '@modules/today/store';

const DateHeader = () => {
    const { width } = useWindowDimensions();
    const { headerWeeks, currentDate } = useTodayStore();

    const showPrev = useStore(({ currentUser }) => {
        if (!currentUser) {
            return false;
        }
        return currentDate.isSameOrAfter(currentUser.createdAt);
    });

    console.log(`[DateHeader] currentDate=${getDateKey(currentDate)}`);

    return (
        <XStack>
            <Carousel
                width={width - 18 * 2}
                height={44}
                style={{ display: 'flex', position: 'relative' }}
                vertical={false}
                loop={false}
                autoPlay={false}
                data={headerWeeks}
                pagingEnabled={true}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <WeekDaySelector
                        key={item}
                        weekStartValue={item}
                    />
                )}
            />
        </XStack>
    );
};

export default DateHeader;
