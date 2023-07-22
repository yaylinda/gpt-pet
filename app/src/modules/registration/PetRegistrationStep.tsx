import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Button, Label, XStack } from 'tamagui';

const PetRegistrationStep = ({ prevStep, nextStep }: RegistrationStepProps) => {
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Label>What type of pet do you like best?</Label>
            <XStack>
                {prevStep && (
                    <Button
                        bordered
                        onPress={prevStep}
                    >
                        Previous
                    </Button>
                )}
                <Button
                    themeInverse
                    onPress={nextStep}
                >
                    Next
                </Button>
            </XStack>
        </Animated.View>
    );
};

export default PetRegistrationStep;
