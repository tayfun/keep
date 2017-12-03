import React, { Component } from 'react';
//import { Link } from 'react-router';
import Nav from './Nav';
import { getNotesData } from '../utils/notes-api.js';


class Notes extends Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  getNotes() {
    getNotesData().then((notes) => {
      this.setState({notes});
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
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

export default Notes;
