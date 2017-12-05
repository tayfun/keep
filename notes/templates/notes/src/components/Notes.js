import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';


class Notes extends Component {
  constructor() {
    super();
    this.state = { notes: [], logged_in: true };
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  getNotes() {
    axios.get(this.props.endpoint).then(
      (response) => {
        let notes = response.data;
        this.setState({notes, logged_in: true});
      }
    ).catch((error) => {
      // Not 200, show login page.
      console.log(error);
      this.setState({logged_in: false});
      let csrftoken = this.getCookie('csrftoken');
      console.log('csrfotken')
      console.log(csrftoken);
      if (csrftoken) {
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
      }
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    if (!this.state.logged_in) {
      return <Redirect to="/login"/>
    }
    const { notes } = this.state;
    return (
      <div>
        <Nav />
        <h3 className="text-center">Your Notes</h3>
        <hr/>

        { 
          notes.map((note, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">#{ note.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { note.word } </p>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
    );
  }
}

Notes.defaultProps = {
  endpoint: '/api/notes'
}

export default Notes;
