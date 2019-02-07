import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import App from '../src/components/App/App';

import reducers from '../src/reducers';

const fs = require('fs');

let webpackAssets = null;

if (process.env.NODE_ENV === 'production') {
  webpackAssets = JSON.parse(fs.readFileSync('./dist/webpack-assets.json', 'utf8'));
}

const runtimeJS = (process.env.NODE_ENV !== 'production') ? 'runtime.js' : `/${webpackAssets.runtime.js}`;
const vendorsJS = (process.env.NODE_ENV !== 'production') ? 'vendors.js' : `/${webpackAssets.vendors.js}`;
const mainJS = (process.env.NODE_ENV !== 'production') ? 'main.js' : `/${webpackAssets.main.js}`;

const vendorsCSS = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="/${webpackAssets.vendors.css}">;`;
const mainCSS = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="/${webpackAssets.main.css}">;`;

const renderPage = (req, store) => {
  const reactMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  const reloadScript = (process.env.NODE_ENV !== 'production') ? '<script src="/reload/reload.js"></script> ' : '';

  return `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${vendorsCSS}
      ${mainCSS}
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};</script>
      <script src="${runtimeJS}"></script>
      <script src="${vendorsJS}"></script>
      <script src="${mainJS}"></script>
      ${reloadScript}
    </body>
  </html>
  `;
};

export default (req, res, next) => {
  const user = {
    name: 'Hydrator',
    authenticated: true,
  };
  const state = { user };
  const store = createStore(reducers, state);

  res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(req, store));
};
