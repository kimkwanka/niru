import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { getHydratedStore } from '../shared/store';

import App from './App';
import './stylus/style.styl';

const store = getHydratedStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter history={createBrowserHistory()}>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ,
  document.getElementById('root'));
};

render(App);

if ((process.env.NODE_ENV !== 'production') && module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
