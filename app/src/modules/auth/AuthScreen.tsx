import {FullHeightScreenWrapper} from '@common/ScreenWrapper';
import {Dog, Sparkles} from '@tamagui/lucide-icons';
import {wrap} from 'lodash';
import Animated, {BounceInDown, BounceInUp} from 'react-native-reanimated';
import {Text, XStack} from 'tamagui';

const AuthScreen = () => {
    return (<FullHeightScreenWrapper>

            <Animated.View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>

                <Animated.View entering={BounceInUp}>
                    <Dog size="$15"/>
                </Animated.View>

                <Animated.View entering={BounceInDown.delay(500)}>
                    <XStack justifyContent="space-between" alignItems="center" gap='$4'>
                        <Sparkles />
                        <Text>Conquer daily tasks with an adorable sidekick</Text>
                        <Sparkles />
                    </XStack>
                </Animated.View>


            </Animated.View>
        </FullHeightScreenWrapper>);
};

export default AuthScreen;
