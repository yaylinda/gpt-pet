import { useNavigation } from '@react-navigation/native';
import { Egg, Sparkles } from '@tamagui/lucide-icons';
import Animated, {
    BounceInDown,
    BounceInUp,
    FadeIn,
} from 'react-native-reanimated';
import { Button, H6, XStack } from 'tamagui';
import type { AuthStackNavigationProps } from '@nav/AuthStackNavigator';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import VerticalSpacer from '@common/VerticalSpacer';
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
                <Button
                    size="$4"
                    onPress={() => navSignUp(navigation, true)}
                    themeInverse
                >
                    Sign Up
                </Button>
                <VerticalSpacer />
                <Button
                    size="$4"
                    onPress={() => navLogIn(navigation, true)}
                >
                    Log In
                </Button>
            </Animated.View>
        </FullHeightScreenWrapper>
    );
};

export default AuthScreen;
