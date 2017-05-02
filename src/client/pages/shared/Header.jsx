import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
  (
    <header>
      <div className="constrained">
        <div className="logoText">niru</div>
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="navItemActive">Home</NavLink></li>
            <li><NavLink to="/dashboard" activeClassName="navItemActive">Dashboard</NavLink></li>
            <li><NavLink to="/styleguide" activeClassName="navItemActive">Styleguide</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );

export default Header;
