/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app';
import About from './about';
import Contact from './contact';
import Home from './home';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/contact/:firstName/:lastName" component={Contact} />
  </Route>
);

export default routes;
