const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

const path = require('path');
const glob = require('glob');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([{ from: path.join(__dirname, '/src/static'), to: path.join(__dirname, '/dist') }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, '/src/components/**/*.jsx'), { nodir: true }),
      minimize: true,
      purifyOptions: {
        info: true,
        rejected: false,
      },
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
});
