// import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Notes from './components/Notes';
import Login from './components/Login';
import Logout from './components/Logout';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" render={() => (
            <Redirect to="/notes"/>
          )} />
          <Route path="/notes" component={Notes}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
