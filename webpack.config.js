const path = require('path')
const webpack = require('webpack')
var APP_DIR = path.resolve(__dirname, 'browser/src')
var BUILD_DIR = path.resolve(__dirname, 'browser/dist')

var config = {

  devtool: 'inline-source-map',
  entry: [
        APP_DIR + '/index.jsx',
      'webpack/hot/dev-server',

      'webpack-hot-middleware/client'
  ],
  output: {
    path: require("path").resolve(BUILD_DIR),
    filename: 'bundle.js',
    publicPath: "/",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
        exclude: /node_modules/
        
      }
    ]
  }
}

module.exports = config