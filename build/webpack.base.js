const { resolve } = require('./utils')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('dist'),
    filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': resolve('public'),
      'src': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader
    !isProd && new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean)
}
