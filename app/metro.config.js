// Learn more https://docs.expo.io/guides/customizing-metro

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// const extraNodeModules = {
//     common: path.resolve(__dirname + '/../supabase/functions/common'),
// };
//
// config.watchFolders = [path.resolve(__dirname + '/../supabase/functions/common')];
//
// config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
//     get: (target, name) =>
//         //redirects dependencies referenced from common/ to local node_modules
//         name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
// });

config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

module.exports = config;
