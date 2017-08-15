import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
  (
    <header>
      <div className="container flex">
        <div className="logo-text">niru</div>
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="navItemActive">Home</NavLink></li>
            <li><NavLink to="/about" activeClassName="navItemActive">About</NavLink></li>
            <li><NavLink to="/styleguide" activeClassName="navItemActive">Styleguide</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );

export default Header;
