module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['relay', {schema: 'schema.json'}]],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
