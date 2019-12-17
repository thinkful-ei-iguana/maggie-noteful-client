import React, { Component } from "react";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import NoteView from "./components/NoteView";
import FolderView from "./components/FolderView";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import Context from "./Context";
import AddFolder from "./components/AddFolder";
import AddNote from "./components/AddNote";
import "./App.css";
import PropTypes from "prop-types";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      baseFolders: "http://localhost:8000/api/folders",
      baseNotes: "http://localhost:8000/api/notes",
      noteId: ""
    };
  }

  fetchNotes = function (url, { method }) {
    return fetch(url, { method })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(response => response.json())
      .catch(err => {
        console.log("Handling error", err);
      });
  };

  fetchFolders = function (url, { method }) {
    return fetch(url, { method })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(response => response.json())
      .catch(err => {
        console.log("Handling error", err);
      });
  };

  componentDidMount() {
    this.fetchFolders(this.state.baseFolders, { method: "GET" }).then(data => {
      const APIfolders = data;
      this.setState({ folders: APIfolders });
    });
    this.fetchNotes(this.state.baseNotes, { method: "GET" }).then(data => {
      const APInotes = data;
      this.setState({ notes: APInotes });
    });
  }

  delete = noteId => {
    let newUrl = `http://localhost:9090/notes/${noteId}`;
    let newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.fetchNotes(`${newUrl}`, { method: "DELETE" }).then(() => {
      this.setState({
        noteId: noteId,
        notes: newNotes
      });
    });
  };

  addNewFolder = newFolderData => {
    this.setState(
      {
        folders: [...this.state.folders, newFolderData]
      },
      () => this.props.history.push("/")
    );
  };

  addNewNote = newNoteData => {
    console.log(newNoteData);
    this.setState(
      {
        notes: [...this.state.notes, newNoteData]
      },
      () => this.props.history.push("/")
    );
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      delete: this.delete,
      fetchFolders: this.fetchFolders,
      fetchNotes: this.fetchNotes,
      changeAppFolders: this.addNewFolder,
      changeAppNotes: this.addNewNote
    };

    return (
      <Context.Provider value={contextValue}>
        <div>
          <header>
            <Link to="/">
              <h1>Noteful</h1>
            </Link>
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route path="/folder/:folderId" component={FolderView} />

            <Route path="/notes/:noteId" component={NoteView} />

            <Route path="/AddFolder" component={AddFolder} />

            <Route path="/AddNote" component={AddNote} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
