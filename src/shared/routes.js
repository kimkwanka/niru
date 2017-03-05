/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/layout';
import Home from '../components/home';
import Dashboard from '../components/dashboard';

// export getRoutes function instead of simple JSX to access redux store in checkAuth
const getRoutes = store => (
  <Route path="/" component={Layout} >
    <IndexRoute component={Home} />
    <Route path="/dashboard" component={Dashboard} />
  </Route>
);

export default getRoutes;
