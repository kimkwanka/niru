import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import App from '../client/App';
import routes from '../shared/routes';
import reducers from '../client/reducers';

const fs = require('fs');

let webpackAssets = null;

if (process.env.NODE_ENV === 'production') {
  webpackAssets = JSON.parse(fs.readFileSync('webpack-assets.json', 'utf8'));
}

const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';
const cssFile = (process.env.NODE_ENV !== 'production') ? '' : `<link rel="stylesheet" href="${webRoot}/${webpackAssets.main.css}">`;
const runtimeJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/runtime.js` : `${webRoot}/${webpackAssets.runtime.js}`;
const vendorJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/vendor.js` : `${webRoot}/${webpackAssets.vendor.js}`;
const mainJs = (process.env.NODE_ENV !== 'production') ? `${webRoot}/main.js` : `${webRoot}/${webpackAssets.main.js}`;

const renderPage = (matchedRoute, store) => {
  // We need to provide the serverRoute prop to <App /> since we are on the server side
  // and can only render a single route with StaticRouter
  // (Switch is not working like on client side)

  const reactMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={matchedRoute.url}>
        <App serverRoute={matchedRoute} />
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

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
      ${cssFile}
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};</script>
      <script src="${runtimeJs}"></script>
      <script src="${vendorJs}"></script>
      <script src="${mainJs}"></script>
    </body>
  </html>
  `;
};

export default (req, res, next) => {
  let matchedRoute = null;

    // Check if the requested url is one of the React Router routes from routes.js
  for (let i = 0; i < routes.length; i += 1) {
    const pathMatch = matchPath(req.baseUrl, {
      path: routes[i].path,
      exact: routes[i].exact,
      strict: false,
    });

    if (pathMatch) {
      matchedRoute = {
        ...routes[i],
        url: pathMatch.url,
      };
      break;
    }
  }
  if (!matchedRoute) {
    // Not a React Router route, so let express handle it
    next();
  } else {
    const user = {
      name: 'Bob the User',
      authenticated: true,
    };
    const state = { user };
    const store = createStore(reducers, state);

    res.set('Content-Type', 'text/html')
      .status(200)
      .end(renderPage(matchedRoute, store));
  }
};
