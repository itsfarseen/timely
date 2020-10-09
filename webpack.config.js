// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = [
  {
    mode: 'development',
    target: 'electron-renderer',
    entry: {
        browser: './src/browser.js',
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
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
    },
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({template: './src/index.ejs'})
    ]
  }, 
  {
    mode: 'development',
    entry: {
        electron: './src/electron.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'electron-main'
  }
]
