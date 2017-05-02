const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Use harmony branch "git://github.com/mishoo/UglifyJS2#harmony"" of UglifyJS to handle ES6 code
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const clientConfig = {
  entry: dev ? [
    'webpack-dev-server/client?http://localhost:8081',
    'react-hot-loader/patch',
    './src/client/index.jsx',
  ] : './src/client/index.jsx',
  devtool: dev ? 'eval' : false,
  output: {
    publicPath: 'http://localhost:8081/',
    path: path.join(__dirname, '/dist/public'),
    filename: 'client.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.NamedModulesPlugin(),
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
