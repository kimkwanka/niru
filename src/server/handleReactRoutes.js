/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from '../shared/routes';
import { hydrateStore } from '../shared/store';

const cssLink = (process.env.NODE_ENV !== 'production') ? '' : '/style.css';
const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';

export default (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const store = hydrateStore({ user: { name: 'Harald', ip } });

  match({ routes: getRoutes(store), location: req.url }, (matchErr, redirect, props) => {
    if (matchErr) {
      res.status(500).send(matchErr.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>,
      );
      res.status(200).render('index', { content: appHtml, preloadedState: store.getState(), title: 'Niru', cssLink, webRoot });
    } else {
      next(); // Let Express handle all other routes
    }
  });
};
