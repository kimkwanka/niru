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
    path.resolve(__dirname, 'src/index.js'),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'src/static'),
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
