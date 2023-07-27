import { useNavigation, useRoute } from '@react-navigation/native';
import { Cat, PartyPopper } from '@tamagui/lucide-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { BounceInUp, FadeIn } from 'react-native-reanimated';
import { Button, H6, Paragraph, Spinner, XStack, YStack } from 'tamagui';
import type {
    AuthStackNavigationProps,
    AuthStackRouteProps,
} from '@nav/AuthStackNavigator';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import TextInputWithLabel from '@common/TextInputWithLabel';
import VerticalSpacer from '@common/VerticalSpacer';
import useAuthStore from '@modules/auth/store';

const AuthStackSignUpScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();
    const { params } = useRoute<AuthStackRouteProps<'SignUp'>>();

    const { submit, signingIn, navLogIn } = useAuthStore();

    const [email, setEmail] = React.useState<string>('');
    const [emailErr, setEmailErr] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordErr, setPasswordErr] = React.useState<string>('');
    const [passwordConf, setPasswordConf] = React.useState<string>('');
    const [passwordConfErr, setPasswordConfErr] = React.useState<string>('');

    const submitAndValidate = () => {
        const errors = submit(email, password, passwordConf);
        if (errors) {
            setEmailErr(errors['email']);
            setPasswordErr(errors['password']);
            setPasswordConfErr(errors['passwordConf']);
        }
    };

    return (
        <FullHeightScreenWrapper>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <YStack space="$10">
                    <Animated.View
                        entering={params.animate ? BounceInUp : undefined}
                        style={{ alignItems: 'center' }}
                    >
                        <Cat size="$12" />
                        <VerticalSpacer />
                        <XStack
                            width="100%"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <PartyPopper size="$4" />
                            <H6
                                width="50%"
                                textAlign="center"
                            >
                                Team up with cute pets and complete tasks
                                together
                            </H6>
                            <PartyPopper size="$4" />
                        </XStack>
                    </Animated.View>

                    <Animated.View
                        entering={
                            params.animate ? FadeIn.delay(500) : undefined
                        }
                    >
                        <TextInputWithLabel
                            id="signup_email"
                            label="Email Address"
                            placeholder="email@email.com"
                            value={email}
                            onUpdate={(value) => {
                                setEmail(value);
                                setEmailErr('');
                            }}
                            disabled={signingIn}
                            errorMessage={emailErr}
                        />
                        <TextInputWithLabel
                            id="signup_pwd"
                            label="Password"
                            placeholder=""
                            value={password}
                            onUpdate={(value) => {
                                setPassword(value);
                                setPasswordErr('');
                            }}
                            disabled={signingIn}
                            errorMessage={passwordErr}
                            additionalProps={{
                                secureTextEntry: true,
                            }}
                        />
                        <TextInputWithLabel
                            id="pwd_conf"
                            label="Confirm Password"
                            placeholder=""
                            value={passwordConf}
                            onUpdate={(value) => {
                                setPasswordConf(value);
                                setPasswordConfErr('');
                            }}
                            disabled={signingIn}
                            errorMessage={passwordConfErr}
                            additionalProps={{
                                secureTextEntry: true,
                            }}
                        />
                        <VerticalSpacer />
                        <Button
                            size="$4"
                            themeInverse
                            onPress={submitAndValidate}
                        >
                            {signingIn ? <Spinner /> : 'Sign Up'}
                        </Button>
                    </Animated.View>
                </YStack>
            </KeyboardAvoidingView>

            <XStack
                justifyContent="center"
                alignItems="center"
            >
                <Paragraph>Already have an account?</Paragraph>
                <Button
                    size="$4"
                    onPress={() => navLogIn(navigation, false)}
                    chromeless
                >
                    Log In
                </Button>
            </XStack>
        </FullHeightScreenWrapper>
    );
};

export default AuthStackSignUpScreen;
