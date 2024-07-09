module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', 'metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-transform-runtime',
  ],
};

