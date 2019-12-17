import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Folder(props) {
  return (
    <Link to={`/folder/${props.id}`}>
      <div className="Folder" id={props.id}>
        <h3>{props.name}</h3>
      </div>
    </Link>
  );
}

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.object,
  match: PropTypes.object
};
