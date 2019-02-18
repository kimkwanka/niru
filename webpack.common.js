const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // Disable transformation of ES6 module syntax to make enable Tree Shaking.
          // Note that we also need to set NODE_ENV to 'production' manually
          // (see package.json 'build' script)
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
