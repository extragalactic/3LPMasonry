import { resolve } from 'path';
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  context: resolve('customerfacing/src'),
  entry: ['./index.jsx'],
  output: {
    path: resolve('customerfacing/dist'),
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
