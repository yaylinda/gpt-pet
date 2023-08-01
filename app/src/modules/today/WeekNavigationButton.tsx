import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import * as Burnt from 'burnt';
import { Button } from 'tamagui';
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

        if (prev && dateCarouselRef.current.getCurrentIndex() === 0) {
            Burnt.toast({
                title: 'No more scroll',
                preset: 'custom',
                icon: {
                    ios: {
                        name: '',
                        color: '',
                    },
                },
                haptic: 'warning',
                duration: 1,
            });
        }

        // TODO - toast on end of list scroll?

        prev ? dateCarouselRef.current.prev({ animated: true }) : dateCarouselRef.current.next({ animated: true });
    };

    return (
        <Button
            key={prev ? 'prev' : 'next'}
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

export default WeekNavigationButton;
