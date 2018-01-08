import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(this.props.endpoint, this.state).then((response) => {
        this.setState({logged_in: true})
      }).catch((error) => {
        this.props.alert.error(error.message);
      });
  }

  render() {
    if (this.state.logged_in) {
      return <Redirect to="/notes"/>
    }
    return (
      <div id='login'>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="form-group">
            <input type="text" className="form-control" id="username" aria-describedby="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

Login.defaultProps = {
  endpoint: '/api/login/'
}

export default withAlert(Login);
