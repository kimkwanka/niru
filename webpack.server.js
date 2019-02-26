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
  stats: 'minimal',
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
};

// In development mode we don't bundle up the whole express server
// but ONLY the SSR module to enable HMR for the React parts.

// Even though it is possible to use HMR on the whole server it leads to a lot
// of complications in my experience. (Especially when dealing with Sockets or express middleware
// that just won't work correctly with HMR)

// Therefore we leverage nodemon's auto restarts for the non-React parts instead.

// In production though, we can just bundle up the whole server.

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
    // Note that we have to create a library bundle, since ./serverSideRendering is not executable
    output: {
      filename: 'ssr.js',
      libraryTarget: 'umd',
      library: 'ssr',
    },
  })
  : merge(common, {
    mode: 'production',
    entry: './server/server.js',
    output: {
      filename: 'server.js',
    },
  });
