/* eslint-disable global-require */
/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import ip from 'ip';

import serverSideRendering from './serverSideRendering';
import api from './api';

const PORT = process.env.PORT || 8080;
const serverIP = ip.address();
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

// Example api route
api(app);

// Server side rendering of React pages
app.use('*', serverSideRendering);

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`\nExpress server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Local:            http://localhost:${PORT}/`);
  console.log(`On Your Network:  http://${serverIP}:${PORT}/\n`);
});
