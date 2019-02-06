/* eslint-disable global-require */
/* eslint-disable no-console */
import http from 'http';
import express from 'express';

const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// Serve static assets
// app.use(express.static(path.resolve(__dirname, '../dist')));

if (isDev) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('../webpack.dev');
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Express server running at ${PORT} in ${process.env.NODE_ENV || 'dev'} mode`);
});
