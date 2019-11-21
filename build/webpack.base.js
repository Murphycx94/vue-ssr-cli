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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'media/[name].[hash:8].[ext]'
        }
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
