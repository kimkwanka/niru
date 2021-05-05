import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';
import * as fs from 'fs';

import App from 'Client/components/App/App';

import reducers from 'Client/reducers';

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
  const initialState = JSON
    .stringify(store.getState())
    .replace(/</g, '\\u003c');

  return `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
      <link rel="icon" href="data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAD///8B////XeTZ+77VwvnC8uz9lv///zj///8s+PX+kNfF+b/j
      1/u6+vn+T////wEAAAAAAAAAAAAAAAAAAAAA////Hunf/MpjHun/Yx7p/2Me6f/czPng49j64WMe
      6f9jHun/Yx7p/+LW+8j///8EAAAAAAAAAAAAAAAAAAAAAP///zpjHun/0bz4///////r4vz/n3Xx
      /4pX7v/y7Pz//////8Oo9v9jHun/+PX9BQAAAAAAAAAAAAAAAAAAAAD///87Yx7p/9G9+P/6+P7/
      28z6/6aA8v+UZu//39L6//v5/v/Fq/b/Yx7p//bz/QYAAAAAAAAAAP///wP///8+7ub8pbOS9PKS
      Y+//s5H0/5ls8P9jHun/Yx7p/5dp8P+vjPP/lmfv/76i9fb18P2N////Nf///wH9/P5G28v55GMe
      6f/Mtvf/hE3t/7+j9f/BpfX/39H6/+LW+//Zyfn/mW3w/7KQ8/+7nfX/Yx7p/9fG+dr///9Z8uz9
      0mMe6f/r4vz//////7aW9P9jHun/1MH5/2Me6f9jHun/5Nj6/2Me6f+2lvT//Pr+//r4/v9jHun/
      5dr7t/Pt/cljHun/5Nj7//38//+5mvT/Yx7p/9G9+P9jHun/Yx7p/9/R+v9jHun/vJ/1//r4/v/n
      3fv/Yx7p/+DU+7L49f5D2cn5z2Me6f+5mvT/g03t/7OS8/+/o/X/28z5/9rK+f/TwPj/mm7w/6N7
      8f+ui/P/Yx7p/9TA+db8+v9O////Avj1/SXu5/yGy7X375hr7/+wjfP/ilfu/2Me6f9jHun/hU/t
      /6yJ8/+fdPH/0r/39e3l/ID9+/8g////BAAAAAAAAAAA////NWMe6f/Svvj//////93P+v+wjvP/
      kmLv/+nf+///////wqj2/2Me6f/6+f0FAAAAAAAAAAAAAAAAAAAAAP///zljHun/y7X3//z6/v/h
      1Pr/poDy/6J58f/h0/v//Pv+/8Gm9v9jHun/+vj9BgAAAAAAAAAAAAAAAAAAAAD///8a6d/8y2Me
      6f9jHun/Yx7p/9jH+cbWxPnQYx7p/2Me6f9jHun/5937yv7+/gQAAAAAAAAAAAAAAAAAAAAA////
      Av79/0rw6f3V7+f82/Hq/YH6+P4i////F/Hr/Xzu5vzY8u39z/n3/kT///8BAAAAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      AAAA//8AAPGPAADgBwAA4AcAAOAHAADAAwAAgAEAAAAAAAAAAAAAgAEAAMADAADgBwAA4AcAAOAH
      AADxzwAA//8AAA==">
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
    'Client/components/App/App',
    'Client/reducers'],
  () => {});
}
