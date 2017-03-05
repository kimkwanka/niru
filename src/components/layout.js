/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { IndexLink, Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <main>
          <IndexLink to="/" activeClassName="active"><li className="navItem">Home</li></IndexLink>
          <Link to="/dashboard" activeClassName="active"><li className="navItem">Dashboard</li></Link>
          {this.props.children}
        </main>
      </div>
    );
  }
}
Layout.propTypes = {
  children: React.PropTypes.node,
};
Layout.defaultProps = () => ({ children: null });

export default Layout;
