/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <h2>{this.props.params.firstName}</h2>
        <h2>{this.props.params.lastName}</h2>
      </div>
    );
  }
}
export default Contact;
