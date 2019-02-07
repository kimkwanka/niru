import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Home from '../Home/Home';
import About from '../About/About';
import Styleguide from '../Styleguide/Styleguide';
import NotFound404 from '../NotFound404/NotFound404';

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
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/styleguide" component={Styleguide} />
        <Route component={NotFound404} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default hot(App);
