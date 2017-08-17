import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../actions';

const { renameUser, toggleAuthenticated } = actions;

const handleToggleClick = () => toggleAuthenticated();

const handleNameChange = (e) => {
  const newName = e.target.value;
  renameUser(newName);
};

const Home = ({ user }) => (
  <div className="container margin-top-small">
    <Helmet title="Home" />
    <h1>Home</h1>
    <h3 className="center">Data from (prehydrated) Redux store:</h3>
    <h4 className="center normal">user.name: <span className="bold">{user.name}</span></h4>
    <h4 className="center normal">user.authenticated: <span className="bold">{user.authenticated ? 'true' : 'false'}</span></h4>
    <div className="flex-column items-center margin-top-big">
      <input type="text" defaultValue={user.name} onChange={handleNameChange} />
      <button className="margin-top-small button--accent" onClick={handleToggleClick}>Toggle Authenticated</button>
    </div>
  </div>
  );

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(Home);
