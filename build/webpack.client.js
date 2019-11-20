const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { resolve } = require('./utils')
const baseConfig = require('./webpack.base')

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, {
  entry: {
    app: resolve('src/entry/client.js')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    !isProd && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean)
})
