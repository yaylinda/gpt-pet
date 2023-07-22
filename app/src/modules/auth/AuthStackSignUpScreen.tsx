import ScreenHeader from '@common/ScreenHeader';
import {FullHeightScreenWrapper} from '@common/ScreenWrapper';
import TextInputWithLabel from '@common/TextInputWithLabel';
import useAuthStore from '@modules/auth/store';
import {AuthStackNavigationProps} from '@nav/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Cat, Heart} from '@tamagui/lucide-icons';
import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import Animated, {BounceInDown, BounceInUp} from 'react-native-reanimated';
import {Button, H6, Paragraph, XStack, YStack} from 'tamagui';

const AuthStackSignUpScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();

    const {signInWithEmailPassword, signUpWithEmailPassword, signingIn, isLogin, navLogIn, navSignUp} = useAuthStore();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordConf, setPasswordConf] = React.useState<string>('');

    const submit = () => {
        setEmail(email);
        setPassword(password);
    };

    return (<>
        <ScreenHeader
            title=""
            leftButtonIcon={ArrowLeft}
            leftButtonAction={() => navigation.pop()}
        />

        <FullHeightScreenWrapper centered>
            <KeyboardAvoidingView
                style={{flex: 1, justifyContent: 'center'}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <YStack space="$10">
                    <Animated.View entering={BounceInUp} style={{alignItems: 'center'}}>
                        <Cat size="$12"/>
                    </Animated.View>

                    <Animated.View entering={BounceInDown.delay(500)}>
                        <XStack justifyContent="space-evenly" alignItems="center">
                            <Heart size="$4"/>
                            <H6 width="50%" textAlign="center">Your pets are eagerly awaiting your return</H6>
                            <Heart size="$4"/>
                        </XStack>
                    </Animated.View>

                    <YStack space="$4">
                        <YStack space="$1">
                            <TextInputWithLabel
                                id="login"
                                label="Email Address"
                                placeholder="email@email.com"
                                value={email}
                                onUpdate={setEmail}
                                disabled={signingIn}
                            />
                            <TextInputWithLabel
                                id="pwd"
                                label="Password"
                                placeholder=""
                                value={password}
                                onUpdate={setPassword}
                                disabled={signingIn}
                                additionalProps={{
                                    secureTextEntry: true,
                                }}
                            />
                            {!isLogin && <TextInputWithLabel
                                id="conf_pwd"
                                label="Confirm Password"
                                placeholder=""
                                value={passwordConf}
                                onUpdate={setPasswordConf}
                                disabled={signingIn}
                                additionalProps={{
                                    secureTextEntry: true,
                                }}
                            />}
                        </YStack>

                        <Button themeInverse onPress={submit}>{isLogin ? 'Log In' : 'Sign Up'}</Button>

                        <XStack justifyContent="center" alignItems="center">
                            <Paragraph>{isLogin ? `Don't have an account yet?` : 'Already have an account?'}</Paragraph>
                            <Button onPress={() => isLogin ? navSignUp(navigation) : navLogIn(navigation)}>{isLogin ? 'Sign Up' : 'Log In'}</Button>
                        </XStack>

                    </YStack>
                </YStack>
            </KeyboardAvoidingView>

        </FullHeightScreenWrapper>
    </>);
};

export default AuthStackSignUpScreen;
