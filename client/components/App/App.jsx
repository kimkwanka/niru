import React from 'react';
import Helmet from 'react-helmet';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader/root';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import routes from '../../routes';

const App = () => (
  <div className="App">
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      titleTemplate="reniru | %s"
      titleAttributes={{ itemprop: 'name', lang: 'en' }}
      meta={[
        { name: 'description', content: 'Universal fullstack boilerplate' },
      ]}
    />
    <Header />
    <main className="page-content relative overflow-hidden">
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </main>
    <Footer />
  </div>
);

export default hot(App);
