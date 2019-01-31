const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
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
