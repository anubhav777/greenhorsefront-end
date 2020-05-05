import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <span className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></span>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="/home" className="nav-link">Home</a>
    </li>
  </ul>
  {/* SEARCH FORM */}
  {/* Right navbar links */}
 
</nav>

            
        );
    }
}

export default Header;