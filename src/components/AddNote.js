import React, { Component } from "react";
import Context from "../Context";
import PropTypes from "prop-types";

class AddNote extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: ""
      },
      folderId: {
        value: ""
      },
      modified: {
        value: ""
      },
      error: null,
      baseURL: "http://localhost:9090/notes"
    };
  }

  setStateName = name => {
    this.setState({
      name: {
        value: name,
        touched: true
      },
      modified: {
        value: new Date()
      }
    });
  };

  setStateContent = content => {
    this.setState({
      content: {
        value: content
      }
    });
  };

  setStateFolderId = folderId => {
    this.setState({
      folderId: {
        value: folderId
      }
    });
  };

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  };

  readyInputForAPI = e => {
    e.preventDefault();
    const input = {
      name: `${this.state.name.value}`,
      modified: `${this.state.modified.value}`,
      folderId: `${this.state.folderId.value}`,
      content: `${this.state.content.value}`
    };
    this.createNoteAPI(input).then(data => this.context.changeAppNotes(data));
    //   .catch(err => console.error(err));
  };

  createNoteAPI = input => {
    const inputValue = JSON.stringify(input);
    console.log(inputValue);
    return fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: inputValue
    })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(res => res.json());
  };

  render() {
    return (
      <form
        className="add-note"
        onSubmit={e => {
          this.readyInputForAPI(e);
        }}
      >
        <div className="form-inputs">
          <label htmlFor="note-name">
            Name this note:
            <input
              type="text"
              name="name"
              id="note-name"
              onChange={e => this.setStateName(e.target.value)}
            />
            {this.state.name.touched && <p>"Name field is required"</p>}
          </label>
          <label htmlFor="note-content">
            Note content:
            <input
              type="text"
              name="content"
              id="note-content"
              className="content"
              onChange={e => this.setStateContent(e.target.value)}
            />
          </label>
          <select onChange={e => this.setStateFolderId(e.target.value)}>
            Folder
            {this.context.folders.map(folder => (
              <option value={folder.id} name={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={this.validateName()}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
AddNote.propTypes = {
  history: PropTypes.object
};

export default AddNote;
