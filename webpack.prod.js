const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const path = require('path');
const glob = require('glob');

const common = require('./webpack.common.js');

const clientSrcFiles = path.join(__dirname, '/client/**/*.@(js|jsx)');
const serverSrcFiles = path.join(__dirname, '/server/**/*.@(js|jsx)');
const purgePaths = [].concat(
  glob.sync(clientSrcFiles, { nodir: true }),
  glob.sync(serverSrcFiles, { nodir: true }),
);

module.exports = merge(common, {
  mode: 'production',
  entry: [
    path.resolve(__dirname, 'client/index.js'),
  ],
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new PurgecssPlugin({
      paths: purgePaths,
    }),
    new AssetsPlugin({
      fullPath: false,
      path: path.join(__dirname, 'dist'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // Apply 2 loaders before css-loader (postcss-loader and
              // stylus-loader) to all @imports instead of 0.
              // Without it, cssnano for example doesn't get applied to the normalize.css portion
            },
          },
          'postcss-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
  },
});
