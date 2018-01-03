import React, { Component } from 'react';


class Note extends Component {

  render() {
    return (
      <div className="col-sm-6" key={this.props.index}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"> <span className="btn">#{ this.props.note.id }</span></h3>
          </div>
          <div className="panel-body">
            <p> { this.props.note.word } </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
