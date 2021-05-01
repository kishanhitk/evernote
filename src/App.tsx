import { useEffect, useState } from "react";
import Editor from "./components/editor/Editor";
import Sidebar from "./components/sidebar/Sidebar";
import { firestore, timestamp } from "./firebase/config";
import { Note } from "./Notes";
function App() {
  const [selectedNote, setselectedNote] = useState<Note | null>(null);
  const [selectedNoteIndex, setselectedNoteIndex] = useState<number | null>(0);
  const [notes, setnotes] = useState<Note[] | null | undefined>(null);
  useEffect(() => {
    firestore.collection("evernote").onSnapshot((snp) => {
      const notes = snp.docs.map((doc) => {
        const data: Note = {
          title: doc.data()["title"],
          id: doc.id,
          body: doc.data()["body"],
        };
        return data;
      });
      setnotes(notes);
    });
  });
  const deleteNote = async (note: Note) => {
    const noteIndex = notes?.indexOf(note);
    setnotes(notes?.filter((_note) => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      setselectedNoteIndex(null);
      setselectedNote(null);
    } else {
      if (notes!.length > 1) {
        setselectedNoteIndex(null);
        setselectedNote(null);
        selectNote(selectedNoteIndex! - 1, notes![selectedNoteIndex! - 1]);
      } else {
        setselectedNoteIndex(null);
        setselectedNote(null);
      }
    }

    firestore.collection("evernote").doc(note.id).delete();
  };
  const newNote = async (title: string) => {
    const newNote: Note = {
      title: title,
      body: "",
      id: "",
    };
    const newNoteFromDb = await firestore.collection("evernote").add({
      title: newNote.title,
      timestamp: timestamp(),
      body: newNote.body,
    });
    const newId = newNoteFromDb.id;
    newNote.id = newId;
    setnotes([...notes!, newNote]);
    const newNoteIndex = notes?.indexOf(
      notes.filter((_note) => _note.id === newId)[0]
    );
    setselectedNote(notes![newNoteIndex as number]);
    setselectedNoteIndex(newNoteIndex as number);
  };
  const selectNote = (index: number, note: Note) => {
    console.log("Select Note ");
    console.log({ note });
    console.log(index);
    setselectedNote(note);
    setselectedNoteIndex(index);
  };
  const noteUpdate = async (id: string, note: Note) => {
    console.log({ note });
    await firestore.collection("evernote").doc(id).update({
      title: note.title,
      body: note.body,
      timestamp: timestamp(),
    });
  };
  return (
    <div className="app-container">
      <Sidebar
        selectNote={selectNote}
        newNote={newNote}
        selectedNoteIndex={selectedNoteIndex!}
        notes={notes!}
        deleteNote={deleteNote}
      ></Sidebar>
      {selectedNote != null ? (
        <Editor
          noteUpdate={noteUpdate}
          selectedNote={selectedNote!}
          selectedNoteIndex={selectedNoteIndex!}
          notes={notes!}
        ></Editor>
      ) : null}
    </div>
  );
}

export default App;
