import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Helmet } from 'react-helmet';

import App from '../src/components/App/App';

import reducers from '../src/reducers';

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
    </head>
    <body>
      <div id="root">${reactMarkup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};</script>
      <script src="main.js"></script>
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
