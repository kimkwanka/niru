const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');

const compiler = webpack(webpackConfig);

module.exports = function devMiddleware(app) {
  app.use(webpackDevMiddleware(compiler, {
    //publicPath: '/',
    stats: {
      colors: true,
      reasons: false,
      chunks: false,
    },
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));
};
