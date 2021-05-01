import { useEffect, useState } from "react";
import Editor from "./components/editor/Editor";
import Sidebar from "./components/sidebar/Sidebar";
import { firestore } from "./firebase/config";
import { Notes } from "./Notes";
function App() {
  const [selectedNote, setselectedNote] = useState(null);
  const [selectedNoteIndex, setselectedNoteIndex] = useState<number>(0);
  const [notes, setnotes] = useState<Notes[] | null>(null);
  useEffect(() => {
    firestore.collection("evernotes").onSnapshot((snp) => {
      const notes = snp.docs.map((doc) => {
        const data: Notes = {
          title: doc.data()["title"],
          id: doc.id,
          body: doc.data()["body"],
        };
        return data;
      });
      setnotes(notes);
    });
  });
  const deleteNote = () => {};
  const newNote = () => {};
  const selectNote = () => {};
  return (
    <div className="app-container">
      <Sidebar
        selectNote={selectNote}
        newNote={newNote}
        selectedNoteIndex={selectedNoteIndex}
        notes={notes!}
        deleteNote={deleteNote}
      ></Sidebar>
      <Editor></Editor>
    </div>
  );
}

export default App;
