module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Only keep Reanimated plugin, expo-router/babel is now deprecated
      "react-native-reanimated/plugin"
    ],
  };
};
