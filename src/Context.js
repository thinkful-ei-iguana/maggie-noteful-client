import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  delete: function() {},
  fetchFolders: function() {},
  fetchNotes: function() {},
  changeAppFolders: function() {},
  changeAppNotes: function() {}
});

export default Context;
