import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, YStack } from 'tamagui';
import WeekDaySelector from '@modules/today/WeekDaySelector';
import useTodayStore from '@modules/today/store';

interface WeekNavigationButtonProps {
    prev?: boolean;
}

const WeekNavigationButton = ({ prev }: WeekNavigationButtonProps) => {
    const { dateCarouselRef } = useTodayStore();

    const icon = prev ? ChevronUp : ChevronDown;
    const topLeftRad = prev ? '$4' : 0;
    const botLeftRad = prev ? 0 : '$4';

    const nav = () => {
        if (!dateCarouselRef.current) {
            return;
        }

        prev
            ? dateCarouselRef.current.prev({ animated: true })
            : dateCarouselRef.current.next({ animated: true });
    };

    return (
        <Button
            size="$2"
            borderTopLeftRadius={topLeftRad}
            borderTopRightRadius={0}
            borderBottomLeftRadius={botLeftRad}
            borderBottomRightRadius={0}
            padding={0}
            space={0}
            gap={0}
            icon={icon}
            scaleIcon={1.5}
            onPress={nav}
        />
    );
};

const DateHeader = () => {
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

export default DateHeader;
