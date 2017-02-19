/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { IndexLink, Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <ul role="navigation">
          <li><IndexLink to="/" activeStyle={{ color: 'red' }} activeClassName="active">Home</IndexLink></li>
          <li><Link to="/about" activeStyle={{ color: 'red' }} activeClassName="active">About</Link></li>
          <li><Link to="/contact" activeStyle={{ color: 'red' }} activeClassName="active">Contact</Link></li>
          <li><Link to="/contact/Abe/Simpson" activeStyle={{ color: 'red' }} activeClassName="active">Contact With Param</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node,
};
App.defaultProps = () => ({ children: null });

export default App;
