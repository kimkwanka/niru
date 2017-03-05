/* global window */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

const getHydratedStore = (middleWare) => {
  let preloadedState = {};
  if (window.__PRELOADED_STATE__) {
    preloadedState = Object.assign({}, window.__PRELOADED_STATE__);
  }
  // console.log(preloadedState);
  const store = middleWare ? createStore(reducer, preloadedState, applyMiddleware(middleWare)) :
          createStore(reducer, preloadedState);
  delete window.__PRELOADED_STATE__;
  return store;
};

const hydrateStore = state => (createStore(reducer, state));

export {
  hydrateStore,
  getHydratedStore,
};
