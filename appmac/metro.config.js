const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require("path");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *resolver: {
 *  unstable_enableSymlinks: true,
 *  unstable_enablePackageExports: true,
 *},
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
console.log(path.resolve(__dirname, 'node_modules'))
console.log(222222222222)
const config = {

 resolver: {
   unstable_enableSymlinks: true,
   unstable_enablePackageExports: true,
 },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
