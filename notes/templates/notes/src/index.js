import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import Notes from './components/Notes';
import Login from './components/Login';
import Logout from './components/Logout';
import registerServiceWorker from './registerServiceWorker';


const options = {
  timeout: 5000,
}


class Root extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
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
      </AlertProvider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
