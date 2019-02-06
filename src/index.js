/* eslint-disable react/jsx-filename-extension */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';

import store from './store';

import './stylus/style.styl';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);
