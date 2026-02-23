/*import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Link to="/" style={{alignSelf: 'center'}}>Recipe Collection</Link>
      <ul>
        <li style={{listStyle: 'none'}}><Link to="/recipes/add">Add Recipe</Link></li>
      </ul>
    </div>
  )
}

export default Navbar*/

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="brutalist-nav">
      <div className="nav-ticker">
        <span className="ticker-text">
          ★ RECIPE COLLECTION ★ COOK SOMETHING ★ EAT WELL ★ RECIPE COLLECTION ★
          COOK SOMETHING ★ EAT WELL ★ RECIPE COLLECTION ★ COOK SOMETHING ★ EAT
          WELL ★
        </span>
      </div>
      <div className="nav-main">
        <Link to="/" className="nav-logo">
          <span className="logo-bracket">[</span>
          RECIPE
          <br />
          COLLECTION
          <span className="logo-bracket">]</span>
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            ◈ INDEX
          </Link>
          <Link to="/recipes/add" className="nav-link nav-link--cta">
            + ADD RECIPE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
