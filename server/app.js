/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import api from './api';

// eslint-disable-next-line import/no-unresolved
const SSR = process.env.NODE_ENV !== 'production' ? require('../dist/ssr').default : require('./serverSideRendering').default;

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
      stats: config.stats,
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
app.use(express.static(path.resolve(__dirname, '../dist/assets')));

// Example api route
app.get('/api', api);

// Server side rendering of React pages and 404s
app.get('*', SSR);

export default app;
