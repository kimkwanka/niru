/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import serverSideRendering from './serverSideRendering';
import api from './api';

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

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

  // Use 'reload' to refresh browser on server changes in dev mode
  const reload = require('reload');
  reload(app);
}

// Serve static assets from the public folder (images, etc.)
app.use(express.static(path.resolve(__dirname, '../public')));

// Serve static assets from the build folder (webpack bundles)
app.use(express.static(path.resolve(__dirname, '../dist')));

// Example api route
app.get('/api', api);

// Server side rendering of React pages
app.get('*', serverSideRendering);

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

export default app;
