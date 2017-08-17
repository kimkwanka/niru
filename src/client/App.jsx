import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import ScrollToTop from './components/shared/ScrollToTop';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

import routesArr from '../shared/routes';

const App = ({ serverRoute }) => {
// If <App /> is rendered on the server we need to provide the serverRoute prop
// since StaticRouter can only render a single Route (Switch only works on client side).
// On the client though, just return all routes and let Switch do the work.

  const routes = serverRoute ?
    <Route key={serverRoute.path} {...serverRoute} /> :
    routesArr.map(route => <Route key={route.path} {...route} />);

  return (
    <ScrollToTop>
      <div className="App">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          titleTemplate="niru | %s"
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            { name: 'description', content: 'Universal fullstack boilerplate' },
          ]}
        />
        <Header />
        <main className="page-content relative overflow-hidden">
          <Switch>
            {routes}
          </Switch>
        </main>
        <Footer />
      </div>
    </ScrollToTop>
  );
};

App.propTypes = {
  serverRoute: PropTypes.objectOf(PropTypes.shape),
};

App.defaultProps = {
  serverRoute: null,
};

export default App;
