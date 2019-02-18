const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
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
  entry: ['webpack/hot/poll?1000', './server/serverSideRendering.jsx'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['nodemon --exec node -r @babel/register server/server.js'],
      },
    }),
  ],
  output: {
    publicPath: '/',
    filename: 'hot-ssr.js',
    libraryTarget: 'umd',
    library: 'hot-ssr',
  },
};
