import React from "react";
import Folders from "./Folders";
import Notes from "./Notes";
import PropTypes from "prop-types";

export default function FolderView(props) {
  return (
    <div id="wrapper">
      <section>
        <Folders history={props.history} match={props.match} />
      </section>
      <main>
        <Notes history={props.history} match={props.match} />
      </main>
    </div>
  );
}

FolderView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};
