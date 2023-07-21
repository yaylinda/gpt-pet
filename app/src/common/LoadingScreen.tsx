import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FullHeightScreenWrapper } from './ScreenWrapper';

function LoadingScreen() {
    return (
        <FullHeightScreenWrapper>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        </FullHeightScreenWrapper>
    );
}

export default LoadingScreen;
