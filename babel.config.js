module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@realm/babel-plugin',
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
