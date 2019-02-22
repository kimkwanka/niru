const isDev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const path = require('path');

const common = {
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Client: path.resolve(__dirname, 'client'),
    },
  },
  output: {
    publicPath: '/',
    filename: 'ssr.js',
    libraryTarget: 'umd',
    library: 'ssr',
  },
};

module.exports = isDev
  ? merge(common, {
    mode: 'development',
    entry: ['webpack/hot/poll?1000', './server/serverSideRendering.jsx'],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new WebpackShellPlugin({
        onBuildEnd: {
          scripts: ['nodemon --exec node -r @babel/register server/server.js'],
        },
      }),
    ],
  })
  : merge(common, {
    mode: 'production',
    entry: './server/serverSideRendering.jsx',
  });
