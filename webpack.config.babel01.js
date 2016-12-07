import { resolve } from 'path';
import webpackValidator from 'webpack-validator';
import webpack from 'webpack';
module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  context: resolve('browser/src'),
  entry: ['./index.jsx', 'webpack-hot-middleware/client'],
  output: {
    path: resolve('browser/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/,
      },
    ],
    query: {
      presets: ['react', 'es2015'],
    },
  },

};
