const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const usePreact = true; // Enable to replace React with Preact for much smaller build sizes

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Use harmony branch "git://github.com/mishoo/UglifyJS2#harmony"" of UglifyJS to handle ES6 code
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const clientConfig = {
  context: __dirname,
  // Remember to use ['babel-polyfill', './src/client.js'] if using unsupported ES6 features
  entry: dev ? ['webpack-dev-server/client?http://localhost:8081', './src/client/index.js'] : './src/client/index.js',
  target: 'web',
  devtool: dev ? 'eval' : false,
  output: {
    publicPath: 'http://localhost:8081/',
    path: path.join(__dirname, '/dist/public'),
    filename: 'client.bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: usePreact ? {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    } : {},
  },
  stats: {
    colors: true,
    reasons: false,
    chunks: false,
  },
  devServer: {
    host: 'localhost',
    port: '8081',
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.styl$/,
        use: dev ? ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'] :
        ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
          'postcss-loader',
          'stylus-loader',
        ]),
      },
    ],
  },
  plugins: dev ? [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new ExtractTextPlugin('style.css'),
    new UglifyJSPlugin({ mangle: false, sourcemap: false }),
  ],
};

module.exports = clientConfig;
