import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from '../client/App';
import routes from '../shared/routes';

const fs = require('fs');

const webpackAssets = JSON.parse(fs.readFileSync('webpack-assets.json', 'utf8'));

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/${webpackAssets.main.css}">`;
const runtimeJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/runtime.js` : `${webRoot}/${webpackAssets.runtime.js}`;
const vendorJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/vendor.js` : `${webRoot}/${webpackAssets.vendor.js}`;
const mainJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/main.js` : `${webRoot}/${webpackAssets.main.js}`;

const renderPage = (reactHTML, initialStore) => `
  <!DOCTYPE html>
  <html lang="en_US">
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      <meta name="description" content="Universal / isomorphic fullstack boilerplate">
      <meta name="author" content="Kim Kwanka">
      <title>niru</title>
      ${cssFile}
    </head>
    <body>
      <div id="root">${reactHTML}</div>
      <script>window.__INITIAL_STORE__ = ${JSON.stringify(initialStore).replace(/</g, '\\u003c')};</script>
      <script src="${runtimeJs}"></script>
      <script src="${vendorJs}"></script>
      <script src="${mainJs}"></script>
    </body>
  </html>
  `;
// We need to provide the serverMatch prop to <App /> since we are on the server side
// and can only render a single route with StaticRouter (Switch is not working like on client side)
const initialView = (req, match) => renderToString(
  <StaticRouter context={{}} location={match.path}>
    <App serverMatch={match} />
  </StaticRouter>,
  );

export default (req, res, next) => {
  let match = null;
  routes.forEach((route) => {
    const tmp = matchPath(req.baseUrl, { path: route.path, exact: route.exact, strict: false });
    if (tmp) {
      match = { ...tmp, component: route.component };
    }
  });

  if (!match) {
    next();
  } else {
    const user = req.user ? { name: req.user.username, authenticated: true }
                          : { name: '', authenticated: false };
    const store = { user };

    res.set('Content-Type', 'text/html')
    .status(200)
    .end(renderPage(initialView(req, match), store));
  }
};
