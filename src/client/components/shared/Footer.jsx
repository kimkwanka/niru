import React from 'react';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container flex-column items-center">
      <h5 className="margin-top-small">This is a sticky footer!</h5>
      <h5>
        <a
          href="https://github.com/kimkwanka/niru"
          target="_blank" rel="noopener noreferrer"
        >
        niru
        </a> by Kim Kwanka &copy; {year}
      </h5>
    </div>
  </footer>
);

export default Footer;
