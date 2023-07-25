import { ChevronLeftSquare, ChevronRightSquare } from '@tamagui/lucide-icons';
import { Button, H6, XStack } from 'tamagui';

const DateHeader = () => {
    return (
        <XStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
        >
            <Button
                circular
                icon={ChevronLeftSquare}
                scaleIcon={2}
                size="$4"
                chromeless
            />
            <H6 />
            <Button
                circular
                icon={ChevronRightSquare}
                scaleIcon={2}
                size="$4"
                chromeless
            />
        </XStack>
    );
};

export default DateHeader;
