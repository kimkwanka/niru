/* eslint-disable no-param-reassign */
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const NotFound404 = ({ staticContext }) => {
  // Set StaticRouter context status to 404 to let the server know
  staticContext.status = 404;

  return (
    <div className="container margin-top-small">
      <Helmet title="Not Found" />
      <h1>404</h1>
      <p>Oops! Nothing here :(</p>
    </div>
  );
};

NotFound404.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.shape),
};

NotFound404.defaultProps = {
  staticContext: {},
};

export default NotFound404;
