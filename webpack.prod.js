const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const glob = require('glob');

const common = require('./webpack.common.js');

const clientSrcFiles = path.join(__dirname, '/src/**/*.@(js|jsx)');
const serverSrcFiles = path.join(__dirname, '/server/**/*.@(js|jsx)');
const purgePaths = [].concat(
  glob.sync(clientSrcFiles, { nodir: true }),
  glob.sync(serverSrcFiles, { nodir: true }),
);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([{ from: path.join(__dirname, '/src/static'), to: path.join(__dirname, '/dist') }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurgecssPlugin({
      paths: purgePaths,
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
