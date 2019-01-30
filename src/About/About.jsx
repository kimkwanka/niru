import React from 'react';
import Helmet from 'react-helmet';

const About = () => (
  <div className="container margin-top-small">
    <Helmet title="About" />
    <h1>About</h1>
    <img className="width-100" src="/fistbump.jpg" alt="fistbump" />
    <p>Imagine there was a fancy About page here...</p>
  </div>
);

export default About;
