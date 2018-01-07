import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import NotesInLanguage from './NotesInLanguage';
import NewNote from './NewNote';


class Notes extends Component {
  static defaultProps = {
    endpoint: '/api/notes/'
  }

  constructor() {
    super();
    let csrftoken = this.getCookie('csrftoken');
    if (csrftoken) {
      axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
    }
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
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  createNewNote(event) {
    let form_data = new FormData(event.target);
    let payload = {};
    form_data.forEach(function(value, key) {
      payload[key] = value;
    });
    axios.post(this.props.endpoint, payload).then(
      (response) => {
        alert('Note created.');

        this.setState(prevState => ({
          notes: [response.data, ...prevState.notes]
        }));
        // Reset the form after successful creation.
        event.target.reset();
        let languageDiv = document.getElementById(response.data.language);
        languageDiv.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    ).catch((error) => {
        alert('Error: Note failed.');
    });
    event.preventDefault();
    // Events are normally reused for performance reasons by ReactJS.
    event.persist();
  }

  deleteNote(event, noteId) {
    axios.delete(this.props.endpoint + noteId + '/').then(
      (response) => {
        alert('Success: Note deleted.');
        event.target.parentNode.parentNode.remove();
      }
    ).catch((error) => {
      alert('Error: Note could not be deleted.');
    });
    event.preventDefault();
    event.persist();
  }

  render() {
    if (!this.state.logged_in) {
      return <Redirect to="/login"/>
    }
    const { notes } = this.state;
    let notesInLanguage = {};
    for (var note of notes) {
      if (!notesInLanguage[note.language]) {
        notesInLanguage[note.language] = [note]
      } else {
        notesInLanguage[note.language].push(note)
      }
    }
    let notesInLanguageList = [];
    Object.entries(notesInLanguage).forEach(
      ([language, notes]) => {
        notesInLanguageList.push(
          <NotesInLanguage key={ language } language={ language } notes={ notes } deleteNote={ this.deleteNote.bind(this) } />
        )
      }
    )
    return (
      <div>
        <Nav />
        <div className="add-note">
          <h3 className="text-center">Add Note</h3>
          <hr/>
          <div id='create'>
            <NewNote onSubmit={ this.createNewNote.bind(this) } />
          </div>
        </div>

        <div className="your-notes">
          <div id="notes">
          { notesInLanguageList }
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
