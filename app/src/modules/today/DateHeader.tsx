import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
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
                icon={ChevronRight}
                scaleIcon={2}
                size="$4"
                chromeless
                onPress={nextDay}
            />
        </XStack>
    );
};

export default DateHeader;
