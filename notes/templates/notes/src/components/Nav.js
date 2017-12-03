import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Notes</Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button className="btn btn-info log">Log In</button>
          </li>
          <li>
            <button className="btn btn-info log">Log In</button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
