import React from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";

export default function App() {
  const [notes, setNotes] = React.useState([]);

  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0]; //function createNewNote creates a new object newNote with a unique id and a body. This function also uses the setStates of the two states above.

  React.useEffect(() => {
    //websocket, must give react a way to unsubscribe listener
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      //Sync local notes array with snapshot data
      const notesArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArray);
    });

    return unsubscribe; //will call whenever it needs to clean up if unmounting
  }, []);
  //two states within app. note allows us to create new notes and currentNodeID allows us to handle what note is being operated?

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  function updateNote(text) {
    setNotes((prevNotes) => {
      const noteArray = [];
      for (var i = 0; i < prevNotes.length; i++) {
        const oldNote = prevNotes[i]; //find the note currently being editted
        if (oldNote.id === currentNoteId) {
          noteArray.unshift({ ...oldNote, body: text }); //if found, unshift to move to the beginning
        } else {
          noteArray.push(oldNote); //else push note into array
        }
      }
      return noteArray; //return updated note array.
    });
  }

  async function deleteNote(noteId) {
    const ref = doc(db, "notes", noteId);
    await deleteDoc(ref);
  }

  //function finds the correct note that the currentNoteId is on. If true, the function will update the note with the text, else the old state of the note will be left unchanged.

  //function will find the note matching the currentNoteId, else return the first note.
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} sd direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} /> //findCurrentNote called once
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
// App first checks if there are existing notes, if not, the app will render the div "no-notes", which allows the user to create a new note and start up the note app.
// if notes do exist, head directly to the notes app by rendering the editor and sidebar components.
