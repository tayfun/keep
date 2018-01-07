import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default justify-content-end">
        <Link to="/logout" className="btn btn-primary">Log out</Link>
      </nav>
    )
  }
}

export default Nav;
