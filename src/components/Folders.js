import React from "react";
import Folder from "./Folder";
import Context from "../Context";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FolderError from "./FolderError";

export default class Folders extends React.Component {
  static contextType = Context;
  render() {
    return (
      <div className="Folders">
        {this.context.folders.map(folder => {
          return (
            <div key={folder.id}>
              <FolderError>
                <Folder
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  history={this.props.history}
                  match={this.props.match}
                />
              </FolderError>
            </div>
          );
        })}
        <Link to="/AddFolder">
          <button>Add Folder</button>
        </Link>
        {this.context.folders.map(folder => {
          return (
            <button
              id={folder.id}
              onClick={event => {
                event.preventDefault();
                this.context.delete(event.target.id);
              }}
            >
              Delete
            </button>
          )
        })}
      </div>
    );
  }
}

Folders.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};
