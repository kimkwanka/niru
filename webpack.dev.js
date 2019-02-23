const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // Note that this entry is only needed for hot reload with webpack-dev-middleware
  // and webpack-hot-middleware. HMR with webpack-dev-server works fine without it.
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'client/index.js'),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
      // Include the RHL webpack plugin additionally to the babel plugin to hot patch react-dom.
      // This makes react-dom more compatible with the React 16.6+ features.
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
  },
});
