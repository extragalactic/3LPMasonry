import { resolve } from 'path';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  context: resolve('browser/src'),
  entry: ['./index.jsx'],
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
  node: {
    fs: 'empty',
  },
};
