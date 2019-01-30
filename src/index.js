/* eslint-disable react/jsx-filename-extension */
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};

render(App);
