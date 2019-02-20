import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { renameUser, toggleAuthenticated } from 'Client/actions/userActions';

// Additionally export the undecorated <Home /> itself for easier testing.
// (https://redux.js.org/recipes/writing-tests#connected-components)

export const Home = ({ user, dispatch }) => {
  const handleToggleClick = () => dispatch(toggleAuthenticated());

  const handleNameChange = (e) => {
    const newName = e.target.value;
    dispatch(renameUser(newName));
  };

  return (
    <div className="container margin-top-small">
      <Helmet title="Home" />
      <h1>Home</h1>
      <h3 className="center">Data from (prehydrated) Redux store:</h3>
      <h4 className="center normal">
        user.name:
        <span className="bold">{` ${user.name}`}</span>
      </h4>
      <h4 className="center normal">
        user.authenticated:
        <span className="bold">{user.authenticated ? ' true' : ' false'}</span>
      </h4>
      <div className="flex-column items-center margin-top-big">
        <input type="text" defaultValue={user.name} onChange={handleNameChange} />
        <button
          type="button"
          className="margin-top-small button--accent"
          onClick={handleToggleClick}
        >
          Toggle Authenticated
        </button>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  user: state.user,
}))(Home);
