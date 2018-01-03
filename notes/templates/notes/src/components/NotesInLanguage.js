import React, { Component } from 'react';
import Note from './Note';


class NotesInLanguage extends Component {
  render() {
    return (
      <div id={this.props.language}>
        <h3 className="text-center">{this.props.language}</h3>
        <div id="notesInLanguage">
        { 
          this.props.notes.map((note) => <Note key={note.id} note={note} /> )
        }
        </div>
      </div>
    );
  }
}

export default NotesInLanguage;
