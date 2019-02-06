import React from 'react';
import Helmet from 'react-helmet';
import { HashRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Home from '../Home/Home';
import About from '../About/About';
import Styleguide from '../Styleguide/Styleguide';

const App = () => (
  <Router>
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
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/styleguide" component={Styleguide} />
      </main>
      <Footer />
    </div>
  </Router>
);

export default hot(App);
