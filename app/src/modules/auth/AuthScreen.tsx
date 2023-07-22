import {FullHeightScreenWrapper} from '@common/ScreenWrapper';
import useAuthStore from '@modules/auth/store';
import {AuthStackNavigationProps} from '@nav/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Dog, Sparkles} from '@tamagui/lucide-icons';
import Animated, {BounceInDown, BounceInUp, FadeIn} from 'react-native-reanimated';
import {Button, H6, XStack, YStack} from 'tamagui';

const AuthScreen = () => {

    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();

    return (
        <FullHeightScreenWrapper centered space={"$10"}>

            <Animated.View entering={BounceInUp} style={{ alignItems: 'center'}}>
                <Dog size="$12"/>
            </Animated.View>

            <Animated.View entering={BounceInDown.delay(500)}>
                <XStack justifyContent="space-evenly" alignItems="center">
                    <Sparkles size="4"/>
                    <H6 width='50%' textAlign="center">Conquer daily tasks with an adorable sidekick</H6>
                    <Sparkles size="4"/>
                </XStack>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(2000)}>
                <YStack space>
                    <Button
                        onPress={() => navigation.navigate('SignUp')}
                        themeInverse
                    >
                        Sign Up
                    </Button>
                    <Button onPress={() => navigation.navigate('LogIn')} bordered>Log In</Button>
                </YStack>
            </Animated.View>

        </FullHeightScreenWrapper>
    );
};

export default AuthScreen;
