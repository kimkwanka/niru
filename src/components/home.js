/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';

@connect(store => ({
  user: store.user,
}))
class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home sweet Home</h1>
        <h2>Username: {this.props.user.name}</h2>
        <button>test</button>
      </div>
    );
  }
}
export default Home;
