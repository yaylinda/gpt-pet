import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { YStack } from 'tamagui';
import WeekDaySelector from '@modules/today/WeekDaySelector';
import WeekNavigationButton from '@modules/today/WeekNavigationButton';
import useTodayStore from '@modules/today/store';

const WeekNavigationCarousel = () => {
    const { height } = useWindowDimensions();
    const { headerWeeks, currentDate, onScrolledToWeek, dateCarouselRef } =
        useTodayStore();

    return (
        <YStack
            backgroundColor="$color2"
            borderTopLeftRadius="$4"
            borderBottomLeftRadius="$4"
        >
            <WeekNavigationButton prev />
            <Carousel
                ref={dateCarouselRef}
                width={50} // TODO - don't hardcode
                height={height * 0.55 - (44 + 2 * 28)} // TODO - don't hardcode
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
            <WeekNavigationButton />
        </YStack>
    );
};

export default WeekNavigationCarousel;
