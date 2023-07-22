import { XStack } from 'tamagui';

interface VerticalSpacerProps {
    size?: string | number;
}

const VerticalSpacer = ({ size = '$1' }: VerticalSpacerProps) => {
    return <XStack height={size} />;
};

export default VerticalSpacer;
