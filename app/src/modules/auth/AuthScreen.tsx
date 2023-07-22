import {FullHeightScreenWrapper} from '@common/ScreenWrapper';
import {Dog, Sparkles} from '@tamagui/lucide-icons';
import Animated, {BounceInDown, BounceInUp, FadeIn} from 'react-native-reanimated';
import {Button, H6, XStack, YStack} from 'tamagui';

const AuthScreen = () => {
    return (
        <FullHeightScreenWrapper centered space={"$8"}>

            <Animated.View entering={BounceInUp} style={{ alignItems: 'center'}}>
                <Dog size="$10"/>
            </Animated.View>

            <Animated.View entering={BounceInDown.delay(500)}>
                <XStack justifyContent="space-evenly" alignItems="center">
                    <Sparkles/>
                    <H6 width='50%' textAlign="center">Conquer daily tasks with an adorable sidekick</H6>
                    <Sparkles/>
                </XStack>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(1000)}>
                <YStack space>
                    <Button themeInverse>Sign Up</Button>
                    <Button bordered>Log In</Button>
                </YStack>
            </Animated.View>

        </FullHeightScreenWrapper>
    );
};

export default AuthScreen;
