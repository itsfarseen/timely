// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = [{
  mode: 'development',
  target: 'electron-renderer',
  entry: {
      browser: './browser.js',
  },
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
    resolve: {
        alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    },
  plugins: [
    new VueLoaderPlugin()
  ]
}, {
    mode: 'development',
    entry: {
        electron: './electron.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'electron-main'
}]
