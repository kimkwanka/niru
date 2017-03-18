const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const usePreact = true; // Enable to replace React with Preact for much smaller build sizes

const webpack = require('webpack');
// Use harmony branch "git://github.com/mishoo/UglifyJS2#harmony"" of UglifyJS to handle ES6 code
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
    //libraryTarget: 'commonjs2',     // Or else module.exports will be empty {}
  },
  target: 'node',
  resolve: {
    extensions: ['.js'],
    alias: usePreact ? {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-dom/server': 'preact-compat',
    } : {},
  },
  // Exclude all node_modules from the bundle, except those in the white list.
  // The white listed modules will be transpiled by the babel-loader.
  externals: [nodeExternals({
    whitelist: dev ? ['webpack/hot/poll?1000', 'react-router', 'react-redux', /^lodash/] : ['react-router', 'react-redux', /^lodash/],
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
        test: /\.js$/,
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
    new UglifyJSPlugin({ mangle: false, sourcemap: false }),
  ],
};
module.exports = serverConfig;
