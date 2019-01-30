import React from 'react';
import Helmet from 'react-helmet';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/styleguide">Styleguide</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/styleguide" component={Styleguide} />
      </main>
    </div>
  </Router>
);

export default App;
