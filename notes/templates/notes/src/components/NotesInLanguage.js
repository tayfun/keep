import React, { Component } from 'react';
import Note from './Note';


class NotesInLanguage extends Component {
  render() {
    return (
      <div id={this.props.language} className="container">
        <h3 className="text-center">{this.props.language}</h3>
        <table className="table table-hover table-bordered notesInLanguage">
          <thead>
            <tr className="">
              <th className="word">Word</th>
              <th className="definition">Definition</th>
              <th className="context">Context</th>
            </tr>
          </thead>
          <tbody>
            { 
              this.props.notes.map((note) => <Note key={note.id} note={note} deleteNote={ this.props.deleteNote } /> )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default NotesInLanguage;
