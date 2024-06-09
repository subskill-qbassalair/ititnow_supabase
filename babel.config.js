module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      //   Don't forget to declare reanimated in last position
      'react-native-reanimated/plugin',
    ]
  };
};
