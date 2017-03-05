
/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//eslint-disable-next-line
import css from '../stylus/style.styl';

const render = (Component) => {
  ReactDOM.render(
    <Component />
  ,
document.getElementById('app'));
};

render(App);

if ((process.env.NODE_ENV !== 'production') && module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
