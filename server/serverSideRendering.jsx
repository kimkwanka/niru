import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';
import * as fs from 'fs';

import App from '../client/components/App/App';

import reducers from '../client/reducers';

// We need to setup our server rendered React markup differently depending on the current mode:

// In development mode, we can use simple bundle filenames
// and don't need to insert CSS <style> tags since webpack inlines CSS anyway.

// Furthermore, we use the 'reload' package to automatically refresh the browser
// whenever 'nodemon' restarts the express server.

let runtimeJS = 'runtime.js';
let vendorsJS = 'vendors.js';
let mainJS = 'main.js';

let vendorsCSS = '';
let mainCSS = '';

let reloadScript = '<script src="/reload/reload.js"></script>';

// In production on the other hand, we need to use [name].[contenthash].* bundle filenames
// so cached assets get automatically invalidated whenever their content changes.
// (We can extract these filenames from 'webpack-assets.json' to insert them into our React markup.)

// Also, we now need to insert style tags for the CSS
// and don't reload the browser on server restart.

if (process.env.NODE_ENV === 'production') {
  const webpackAssets = JSON.parse(
    fs.readFileSync('./dist/webpack-assets.json', 'utf8'),
  );

  runtimeJS = `/${webpackAssets.runtime.js}`;
  vendorsJS = `/${webpackAssets.vendors.js}`;
  mainJS = `/${webpackAssets.main.js}`;

  vendorsCSS = `<link rel="stylesheet" href="/${webpackAssets.vendors.css}">`;
  mainCSS = `<link rel="stylesheet" href="/${webpackAssets.main.css}">`;

  reloadScript = '';
}

const renderPage = (url, store, routerContext) => {
  const reactMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  // Insert the sample store's state for client side store hydration
  const initialState = JSON.stringify(
    store.getState(),
  ).replace(/</g, '\\u003c');

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
      <script>window.__INITIAL_STATE__ = ${initialState};
      </script>
      <script src="${runtimeJS}"></script>
      <script src="${vendorsJS}"></script>
      <script src="${mainJS}"></script>
      ${reloadScript}
    </body>
  </html>
  `;
};

export default (req, res) => {
  // Create a Redux store with some sample data to hydrate the client side with
  const user = {
    name: 'Hydrator',
    authenticated: true,
  };
  const state = { user };
  const store = createStore(reducers, state);

  // Empty context to be filled by StaticRouter
  const routerContext = {};

  // Render the requested page
  const pageToRender = renderPage(req.originalUrl, store, routerContext);

  // If the context status is 404 it means we couldn't find the requested page and had to render
  // our custom 404 page (NotFound404) instead.
  // That's why we set the response status to 404 accordingly in this case.
  if (routerContext.status === 404) {
    res.status(404);
  }
  // Regardless of 404 or not, send over the rendered page
  res.send(pageToRender);
};

if (module.hot) {
  module.hot.accept([
    '../client/components/App/App',
    '../client/reducers',
  ], () => {
  });
}
