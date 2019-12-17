import React, { Component } from "react";
import nextId from "react-id-generator";
import Context from "../Context";
import PropTypes from "prop-types";

class AddFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false
      },
      id: {
        value: "",
        touched: false
      },
      error: null,
      baseURL: "http://localhost:9090/folders"
    };
  }

  static contextType = Context;

  settingStateFromFormInput = name => {
    this.setState({
      name: {
        value: name
      },
      id: {
        value: nextId()
      }
    });
  };

  readyInputForAPI = e => {
    e.preventDefault();
    const input = {
      name: `${this.state.name.value}`,
      id: `${this.state.id.value}`
    };
    this.createNewFolderAPI(input)
      .then(data => this.context.changeAppFolders(data))
      .catch(err => console.error(err));
  };

  createNewFolderAPI = input => {
    const newUrl = `http://localhost:9090/folders/`;
    const inputValue = JSON.stringify(input);
    return fetch(newUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
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
        className="add-folder"
        onSubmit={e => {
          this.readyInputForAPI(e);
        }}
      >
        <label htmlFor="new-folder">
          Folder Name:
          <input
            type="text"
            name="folder"
            id="new-folder"
            onChange={e => this.settingStateFromFormInput(e.target.value)}
          />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
AddFolder.propTypes = {
  history: PropTypes.object
};

export default AddFolder;
