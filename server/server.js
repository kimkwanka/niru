/* eslint-disable global-require */
/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import serverSideRendering from './serverSideRendering';

const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

  // Use 'reload' to refresh browser on server changes in dev mode
  const reload = require('reload');
  reload(app);
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
