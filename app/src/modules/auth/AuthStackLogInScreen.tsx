import { useNavigation } from '@react-navigation/native';
import { Dog, Heart } from '@tamagui/lucide-icons';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Animated, {
    BounceInDown,
    BounceInUp,
    FadeIn,
} from 'react-native-reanimated';
import { Button, H6, Paragraph, XStack, YStack } from 'tamagui';
import type { AuthStackNavigationProps } from '@nav/AuthStackNavigator';
import ScreenHeader from '@common/ScreenHeader';
import { FullHeightScreenWrapper } from '@common/ScreenWrapper';
import TextInputWithLabel from '@common/TextInputWithLabel';
import useAuthStore from '@modules/auth/store';

const AuthStackSignUpScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProps<'Auth'>>();

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
        <>
            <ScreenHeader title="" />
            <FullHeightScreenWrapper>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'space-between' }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <YStack space="$10">
                        <Animated.View
                            entering={BounceInUp}
                            style={{ alignItems: 'center' }}
                        >
                            <Dog size="$12" />
                        </Animated.View>

                        <Animated.View entering={BounceInDown.delay(500)}>
                            <XStack
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

                        <Animated.View entering={FadeIn.delay(1500)}>
                            <YStack space="$4">
                                <YStack space="$1">
                                    <TextInputWithLabel
                                        id="login"
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
                                        id="pwd"
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
                                </YStack>
                                <Button
                                    size="$4"
                                    themeInverse
                                    onPress={submitAndValidate}
                                >
                                    Log In
                                </Button>
                            </YStack>
                        </Animated.View>
                    </YStack>

                    <XStack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Paragraph>Don&#39;t have an account yet?</Paragraph>
                        <Button
                            size="$4"
                            onPress={() => navSignUp(navigation)}
                        >
                            Sign Up
                        </Button>
                    </XStack>
                </KeyboardAvoidingView>
            </FullHeightScreenWrapper>
        </>
    );
};

export default AuthStackSignUpScreen;
