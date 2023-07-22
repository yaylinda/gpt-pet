import ScreenHeader from '@common/ScreenHeader';
import {FullHeightScreenWrapper} from '@common/ScreenWrapper';
import TextInputWithLabel from '@common/TextInputWithLabel';
import useAuthStore from '@modules/auth/store';
import {AuthStackNavigationProps} from '@nav/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {Cat, PartyPopper} from '@tamagui/lucide-icons';
import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import Animated, {BounceInDown, BounceInUp} from 'react-native-reanimated';
import {Button, H6, Paragraph, XStack, YStack} from 'tamagui';

const AuthStackSignUpScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();

    const {signInWithEmailPassword, signUpWithEmailPassword, signingIn, navLogIn, navSignUp} = useAuthStore();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordConf, setPasswordConf] = React.useState<string>('');

    const submit = () => {
        setEmail(email);
        setPassword(password);
    };

    return (
        <>
            <ScreenHeader title=""/>
            <FullHeightScreenWrapper>
                <KeyboardAvoidingView
                    style={{flex: 1, justifyContent: 'space-between'}}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <YStack space="$10">
                        <Animated.View entering={BounceInUp} style={{alignItems: 'center'}}>
                            <Cat size="$12"/>
                        </Animated.View>

                        <Animated.View entering={BounceInDown.delay(500)}>
                            <XStack justifyContent="space-evenly" alignItems="center">
                                <PartyPopper size="$4" />
                                <H6 width="50%" textAlign="center">Meet cute critters and complete tasks together</H6>
                                <PartyPopper size="$4"/>
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
                                <TextInputWithLabel
                                    id="pwd_conf"
                                    label="Password"
                                    placeholder=""
                                    value={passwordConf}
                                    onUpdate={setPasswordConf}
                                    disabled={signingIn}
                                    additionalProps={{
                                        secureTextEntry: true,
                                    }}
                                />
                            </YStack>

                            <Button themeInverse onPress={submit}>Sign Up</Button>

                        </YStack>
                    </YStack>
                    <XStack justifyContent="center" alignItems="center">
                        <Paragraph>Already have an account?</Paragraph>
                        <Button onPress={() => navLogIn(navigation)}>Log In</Button>
                    </XStack>
                </KeyboardAvoidingView>

            </FullHeightScreenWrapper>
        </>
    );
};

export default AuthStackSignUpScreen;
