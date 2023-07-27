import { useNavigation, useRoute } from '@react-navigation/native';
import { Dog, Heart } from '@tamagui/lucide-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { BounceInUp, FadeIn } from 'react-native-reanimated';
import { Button, H6, Paragraph, XStack, YStack } from 'tamagui';
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
    const { params } = useRoute<AuthStackRouteProps<'LogIn'>>();

    const { submit, signingIn, navSignUp } = useAuthStore();

    const [email, setEmail] = React.useState<string>('');
    const [emailErr, setEmailErr] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordErr, setPasswordErr] = React.useState<string>('');

    const submitAndValidate = () => {
        const errors = submit(email, password, null);
        if (errors) {
            setEmailErr(errors['email']);
            setPasswordErr(errors['password']);
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
                        <Dog size="$12" />
                        <VerticalSpacer />
                        <XStack
                            width="100%"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Heart size="$4" />
                            <H6
                                width="50%"
                                textAlign="center"
                            >
                                Your pets are eagerly awaiting your return
                            </H6>
                            <Heart size="$4" />
                        </XStack>
                    </Animated.View>

                    <Animated.View
                        entering={
                            params.animate ? FadeIn.delay(500) : undefined
                        }
                    >
                        <TextInputWithLabel
                            id="login_email"
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
                            id="login_pwd"
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
                        <VerticalSpacer />
                        <Button
                            size="$4"
                            themeInverse
                            onPress={submitAndValidate}
                        >
                            Log In
                        </Button>
                    </Animated.View>
                </YStack>
            </KeyboardAvoidingView>

            <XStack
                justifyContent="center"
                alignItems="center"
            >
                <Paragraph>Don&#39;t have an account yet?</Paragraph>
                <Button
                    size="$4"
                    onPress={() => navSignUp(navigation, false)}
                    chromeless
                >
                    Sign Up
                </Button>
            </XStack>
        </FullHeightScreenWrapper>
    );
};

export default AuthStackSignUpScreen;
