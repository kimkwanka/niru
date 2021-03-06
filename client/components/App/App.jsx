import React from 'react';
import Helmet from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader/root';

import routes from 'Client/routes';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const App = () => (
  <div className="App">
    <Helmet titleTemplate="niru | %s">
      <html lang="en" />
      <title itemProp="name" lang="en" />
      <meta name="description" content="Universal fullstack boilerplate" />
    </Helmet>
    <Header />
    <main className="page-content relative overflow-hidden">{renderRoutes(routes)}</main>
    <Footer />
  </div>
);

export default hot(App);
