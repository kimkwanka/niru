import React from 'react';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';

import Header from './components/Header';

const Layout = props => (
  <div>
    <Header />
    <main>
      <div className="main">
        <Switch>
          {props.children}
        </Switch>
      </div>
    </main>
  </div>
  );

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = () => ({ children: null });

export default Layout;
