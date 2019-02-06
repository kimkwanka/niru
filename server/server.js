/* eslint-disable global-require */
/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import path from 'path';

import reload from 'reload';

import serverSideRendering from './serverSideRendering';

const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

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

  // Serve static assets from static src folder
  app.use(express.static(path.resolve(__dirname, '../src/static')));
}

// Serve static assets from build folder
app.use(express.static(path.resolve(__dirname, '../dist')));

// Server side rendering of React pages
app.use('*', serverSideRendering);

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Express server running at ${PORT} in ${process.env.NODE_ENV || 'dev'} mode`);
});

reload(app);
