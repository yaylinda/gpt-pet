// https://docs.expo.dev/workflow/configuration/#dynamic-configuration

export default {
    userInterfaceStyle: 'automatic',
    expo: {
        extra: {
            testA: 'testA value',
            testB: 'testB value',
            testC: 'testC value',
        },
        ios: {
            bundleIdentifier: 'com.yaylinda.gptpet',
        },
        android: {
            package: 'com.yaylinda.gptpet',
        },
    },
    plugins: [
        [
            'expo-build-properties',
            {
                ios: {
                    deploymentTarget: '13.0',
                },
            },
        ],
    ],
};
