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
    // Focus the element so we know when it is blurred.
    event.currentTarget.getElementsByClassName('editable')[0].focus();
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
          this.props.alert.success('Success: Note updated');
      }).catch((error) => {
        this.props.alert.error(error.message);
      });
      this.setState({dirty: false});
    }
  }

  render() {
    return (
      <tr className="note">
        <td className="note-field" onClick={this.edit} >
          <span>{ this.state.word }</span>
          <input
            className="editable"
            name="word"
            value={ this.state.word }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
        </td>
        <td className="note-field" onClick={ this.edit } >
          <span>{ this.state.definition }</span>
          <textarea
            className="editable"
            name="definition"
            value={ this.state.definition }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
        </td>
        <td className="note-field" onClick={ this.edit } >
          <span>{ this.state.context }</span>
          <textarea
            className="editable"
            name="context"
            value={ this.state.context }
            onChange={ this.onChange }
            onBlur={ this.handleSubmit }
          />
          <button type="button" className="btn btn-danger note-delete" onClick={ this.deleteNote }>X</button>
        </td>
      </tr>
    );
  }
}

export default Note;
