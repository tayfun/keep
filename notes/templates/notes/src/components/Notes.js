import axios from 'axios';
import React, { Component } from 'react';
import Nav from './Nav';


class Notes extends Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  getNotes() {
    axios.get(this.props.endpoint).then(
      (response) => {
        let notes = response.data;
        this.setState({notes});
      }
    ).catch((error) => {
      // Not 200, show login page.
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    console.log(this.state);
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
  endpoint: '/notes'
}

export default Notes;
