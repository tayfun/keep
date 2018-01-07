import React, { Component } from 'react';
import Note from './Note';


class NotesInLanguage extends Component {
  render() {
    return (
      <div id={this.props.language}>
        <h3 className="text-center">{this.props.language}</h3>
        <div className="notesInLanguage container">
        { 
          this.props.notes.map((note) => <Note key={note.id} note={note} deleteNote={ this.props.deleteNote } /> )
        }
        </div>
      </div>
    );
  }
}

export default NotesInLanguage;
