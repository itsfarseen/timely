const path = require('path')

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: './src/main.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist-main')
  },
};
