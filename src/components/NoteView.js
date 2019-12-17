import React from "react";
import NotFound from "./NotFound";
import Note from "./Note";
import Context from "../Context";
import PropTypes from "prop-types";

export default class NoteView extends React.Component {
  static contextType = Context;
  render() {
    if (!this.context.notes) {
      return <NotFound />;
    } else {
      const noteId = this.props.match.params.noteId;
      const noteMatch = this.context.notes.find(note => note.id === noteId);
      return (
        <div id="wrapper">
          <section>
            <button onClick={() => this.props.history.goBack()}>Back</button>
            <h4>{noteMatch.name}</h4>
          </section>
          <main>
            <Note
              name={noteMatch.name}
              key={noteMatch.id}
              modified={noteMatch.modified}
              id={noteMatch.id}
              history={this.props.history}
            />
            <button
              id={noteMatch.id}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                this.context.delete(event.target.id);
                this.props.history.push("/");
              }}
            >
              Delete
            </button>
            <p>{noteMatch.content}</p>
          </main>
        </div>
      );
    }
  }
}

NoteView.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
