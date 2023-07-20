process.env.TAMAGUI_TARGET = 'native';

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'transform-inline-environment-variables',
                {
                    include: 'TAMAGUI_TARGET',
                },
            ],
            [
                '@tamagui/babel-plugin',
                {
                    components: ['tamagui'],
                    config: './tamagui.config.ts',
                    logTimings: true,
                },
            ],
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['./'],
                    alias: {
                        common: '../supabase/functions/common',
                        '@': './src',
                        '@modules': './src/modules',
                        '@common': './src/common',
                        '@nav': './src/navigation',
                    },
                },
            ],
        ],
    };
};
