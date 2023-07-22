import { useNavigation } from '@react-navigation/native';
import { Egg, Sparkles } from '@tamagui/lucide-icons';
import Animated, {
    BounceInDown,
    BounceInUp,
    FadeIn,
} from 'react-native-reanimated';
import { Button, H6, XStack, YStack } from 'tamagui';
import type { AuthStackNavigationProps } from '@nav/AuthStackNavigator';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import useAuthStore from '@modules/auth/store';

const AuthScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();

    const { navLogIn, navSignUp } = useAuthStore();

    return (
        <FullHeightScreenWrapper
            centered
            space={'$10'}
        >
            <Animated.View
                entering={BounceInUp}
                style={{ alignItems: 'center' }}
            >
                <Egg size="$15" />
            </Animated.View>

            <Animated.View entering={BounceInDown.delay(500)}>
                <XStack
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Sparkles size="$4" />
                    <H6
                        width="50%"
                        textAlign="center"
                    >
                        Conquer daily tasks with an adorable sidekick
                    </H6>
                    <Sparkles size="$4" />
                </XStack>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(1500)}>
                <YStack space="$2">
                    <Button
                        onPress={() => navSignUp(navigation)}
                        themeInverse
                    >
                        Sign Up
                    </Button>
                    <Button
                        onPress={() => navLogIn(navigation)}
                        bordered
                    >
                        Log In
                    </Button>
                </YStack>
            </Animated.View>
        </FullHeightScreenWrapper>
    );
};

export default AuthScreen;
