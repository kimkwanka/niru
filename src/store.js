/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const getHydratedStore = () => {
  let preloadedState = {};
  const devTools = {};

  if (typeof window !== 'undefined') {
    if (window.__INITIAL_STATE__) {
      preloadedState = { ...window.__INITIAL_STATE__ };
    }
    delete window.__INITIAL_STATE__;

    devTools.compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    devTools.extension = window.__REDUX_DEVTOOLS_EXTENSION__;
  }

  const middleware = [];
  if (process.env.NODE_ENV !== 'production') {
    // Add any Redux middleware we might have when not in production:
    const { logger } = require('redux-logger');
    middleware.push(logger);
  }

  // Use Redux Dev Tools, if available
  const composeEnhancers = devTools.compose || compose;
  const store = middleware
    ? createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middleware)))
    : createStore(reducers, preloadedState, devTools.extension && devTools.extension());

  return store;
};

const store = getHydratedStore();

export default store;
