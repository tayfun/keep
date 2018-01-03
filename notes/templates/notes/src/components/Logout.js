//import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Logout extends Component {
  logout() {

  }

  render() {
    return <Redirect to="/login"/>
  }
}

export default Logout;

