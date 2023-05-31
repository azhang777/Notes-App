import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={() => props.deleteNote(note.id)} //by default whatever function we pass to an event handler will receive the event as its paramenter. In order to pass another parameter along, we must use (event) => props.deleteNote(event, note.id)
          //this way we can also pass note.id
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
//by its name, this is the sidebar that will hold our notes and allow us to switch between different notes.
