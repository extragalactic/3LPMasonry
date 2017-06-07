import { resolve } from 'path';
import webpackValidator from 'webpack-validator';
import webpack from 'webpack';

module.exports = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!react-svg-loader?' + JSON.stringify({
          svgo: {
            // svgo options
            plugins: [{ removeTitle: false }],
            floatPrecision: 2,
          },
        }),
      },
    ],
    query: {
      presets: ['react', 'es2015', 'babel-preset-react-hmre'],
    },
  },
  node: {
    fs: 'empty',
  },
};