import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static contextType = Context;
  render() {
    let readableDate = new Date(this.props.modified);
    readableDate = readableDate.toString();

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div id={this.props.modified}>
          <h3>{this.props.name}</h3>
          <p>{readableDate}</p>
        </div>
      </Link>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  modified: PropTypes.string
};
