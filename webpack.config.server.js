const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const webpack = require('webpack');

const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const path = require('path');

const serverConfig = {
  context: __dirname,
  entry: dev ? ['webpack/hot/poll?1000', './src/server/index'] : './src/server/index',
  watch: dev, // Watch if not in production
  devtool: dev ? 'eval' : false,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js',
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Exclude all node_modules from the bundle, except those in the white list.
  // The white listed modules will be transpiled by the babel-loader.
  externals: [nodeExternals({
    whitelist: dev ? ['webpack/hot/poll?1000', 'react-router-dom', 'react-redux', /^lodash/] : ['react-router-dom', 'react-redux', /^lodash/],
  })],
  stats: {
    colors: true,
    reasons: false,
    chunks: false,
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: dev ? [
    new StartServerPlugin('server.js'),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
module.exports = serverConfig;
