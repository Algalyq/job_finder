/**
 * Metro configuration
 * Enhanced version for Expo SDK 53 with Hermes compatibility
 */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Create a default Metro config
const config = getDefaultConfig(__dirname);

// Use the default configuration with enhanced customization
config.resolver.assetExts.push('png');
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];

// Enable Hermes bytecode
config.transformer.enableBabelRCLookup = false;
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// For older versions of Metro bundler
if (!config.resolver.extraNodeModules) {
  config.resolver.extraNodeModules = {};
}

// Ensure require.context is handled properly
config.resolver.sourceExts.push('cjs');

// Export the config
module.exports = config;