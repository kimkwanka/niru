/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from '../shared/routes';
import { getHydratedStore } from '../shared/store';

//eslint-disable-next-line

const store = getHydratedStore();

export default class extends React.Component {
  render() {
    return (<Provider store={store}>
      <Router routes={getRoutes(store)} history={browserHistory} />
    </Provider>);
  }
}
