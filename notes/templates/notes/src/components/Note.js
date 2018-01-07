import axios from 'axios';
import React, { Component } from 'react';


class Note extends Component {

  static defaultProps = {
    endpoint: '/api/notes/'
  }

  constructor(props) {
    super(props);
    // Set up state from props and use state from now on.
    this.state = {
      word: this.props.note.word,
      definition: this.props.note.definition,
      context: this.props.note.context,
      id: this.props.note.id,
      dirty: false,
    }
    this.onChange = this.onChange.bind(this);
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  toggleEditing(node) {
    let classNames = node.className.split(/\s/);
    let classNamesSet = new Set(classNames);
    if (classNamesSet.has('editing')) {
      classNamesSet.delete('editing');
    } else {
      classNamesSet.add('editing');
    }
    node.className = [...classNamesSet].join(' ');
  }

  edit(event) {
    this.toggleEditing(event.currentTarget);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      dirty: true
    });
  }

  deleteNote(event) {
    console.log('deleteNote');
    this.props.deleteNote(event, this.state.id);
  }

  handleSubmit(event) {
    this.toggleEditing(event.currentTarget.parentNode);
    if (!this.state.dirty) {
      console.log('note not changed');
    } else {
      console.log('note changed, will sync with servers');
      axios.patch(
        this.props.endpoint + this.state.id + '/', 
        this.state
      ).then((response) => {
          alert('Success: Note updated');
      }).catch((error) => {
        alert('There was a problem: Note not updated.');
      });
      this.setState({dirty: false});
    }
  }

  render() {
    return (
      <div className="row note mb-sm-2">
        <div className="col-2 note-field" onDoubleClick={this.edit} >
          <span>{ this.state.word }</span>
          <input
            name="word"
            value={ this.state.word }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
        </div>
        <div className="col-5 note-field" onDoubleClick={ this.edit } >
          <span>{ this.state.definition }</span>
          <input
            name="definition"
            value={ this.state.definition }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
        </div>
        <div className="col-5 note-field" onDoubleClick={ this.edit } >
          <span>{ this.state.context }</span>
          <input
            name="context"
            value={ this.state.context }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
        </div>
        <div className="note-delete" >
          <button type="button" className="btn btn-danger" onClick={ this.deleteNote }>X</button>
        </div>
      </div>
    );
  }
}

export default Note;
