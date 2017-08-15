import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../actions';

const { renameUser, toggleAuthenticated } = actions;

const handleToggleClick = () => toggleAuthenticated();

const handleNameChange = (e) => {
  const newName = e.target.value;
  renameUser(newName);
};

const Home = ({ user }) => (
  <div>
    <Helmet title="Home" />
    <h1>Home</h1>
    <h2>Data from (prehydrated) redux store:</h2>
    <h3>user.name: {user.name}</h3>
    <h3>user.authenticated: {user.authenticated ? 'true' : 'false'}</h3>
    <input type="text" defaultValue={user.name} onChange={handleNameChange} />
    <button onClick={handleToggleClick}>Toggle Authenticated</button>
  </div>
  );

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(Home);
