/* eslint-disable react/jsx-filename-extension */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import './stylus/style.styl';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};

render(App);
