import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import moment from 'moment';
import { Button, H6, XStack } from 'tamagui';
import { formatDateHeader } from '@/utils';
import useTodayStore from '@modules/today/store';

const DateHeader = () => {
    const { currentDate, prevDay, nextDay } = useTodayStore();

    const isToday = currentDate.isSame(moment(), 'day');

    return (
        <XStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
        >
            <Button
                circular
                icon={ChevronLeft}
                scaleIcon={2}
                size="$4"
                chromeless
                onPress={prevDay}
            />
            <H6>{formatDateHeader(currentDate)}</H6>
            <Button
                circular
                icon={isToday ? undefined : ChevronRight}
                scaleIcon={2}
                size="$4"
                chromeless
                onPress={nextDay}
                disabled={isToday}
            />
        </XStack>
    );
};

export default DateHeader;
