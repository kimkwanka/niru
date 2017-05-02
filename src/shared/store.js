/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import reducer from '../client/reducers';

const getHydratedStore = (middleWare) => {
  let preloadedState = {};
  if (window.__INITIAL_STORE__) {
    preloadedState = Object.assign({}, window.__INITIAL_STORE__);
  }
  const store = middleWare ? createStore(reducer, preloadedState, applyMiddleware(middleWare)) :
          createStore(reducer, preloadedState);
  delete window.__INITIAL_STORE__;
  return store;
};

const hydrateStore = state => (createStore(reducer, state));

export {
  hydrateStore,
  getHydratedStore,
};
