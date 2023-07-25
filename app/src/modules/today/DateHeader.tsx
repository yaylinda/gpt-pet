import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import moment from 'moment';
import { Button, H6, XStack } from 'tamagui';
import useStore from '@/store';
import { formatDateHeader } from '@/utils';
import useTodayStore from '@modules/today/store';

const DateHeader = () => {
    const { currentDate, prevDay, nextDay } = useTodayStore();

    const showPrev = useStore(({ currentUser }) => {
        if (!currentUser) {
            return false;
        }
        return currentDate.isSameOrAfter(currentUser.createdAt);
    });

    const showNext = currentDate.isBefore(moment(), 'day');

    return (
        <XStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
        >
            <Button
                circular
                icon={showPrev ? ChevronLeft : undefined}
                scaleIcon={2}
                size="$4"
                chromeless
                onPress={prevDay}
                disabled={!showPrev}
            />
            <H6>{formatDateHeader(currentDate)}</H6>
            <Button
                circular
                icon={showNext ? ChevronRight : undefined}
                scaleIcon={2}
                size="$4"
                chromeless
                onPress={nextDay}
                disabled={!showNext}
            />
        </XStack>
    );
};

export default DateHeader;
