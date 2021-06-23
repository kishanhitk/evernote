import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import useDebounce from "../../hooks/useDebounce";
import { Note } from "../../Notes";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "calc(100% - 300px)",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "50px",
  },
  editIcon: {
    position: "absolute",
    left: "310px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10",
  },
  editorContainer: {
    height: "100%",
    boxSizing: "border-box",
  },
}));
interface EditorProps {
  selectedNote: Note;
  selectedNoteIndex: number;
  notes: Note[];
  noteUpdate: Function;
}
const Editor = ({
  selectedNote,
  selectedNoteIndex,
  notes,
  noteUpdate,
}: EditorProps) => {
  const [title, settitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setid] = useState("");
  const classes = useStyles();

  const debouncedSave = useDebounce(
    (title: string, body: string, id: string) => saveToDb(title, body, id),
    1000
  );

  const updateBody = (val: string) => {
    setBody(val);
    debouncedSave(title, body, id);
  };
  const updateTitle = (val: string) => {
    settitle(val);
    debouncedSave(title, body, id);
  };

  useEffect(() => {
    setBody(selectedNote.body);
    settitle(selectedNote.title);
    setid(selectedNote.id);
  }, [selectedNote]);

  const saveToDb = (title: string, body: string, id: string) => {
    const updatedNote: Note = {
      title: title,
      id: id,
      body: body,
    };
    noteUpdate(updatedNote.id, updatedNote);
  };

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title ?? ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>
      <ReactQuill value={body} onChange={updateBody}></ReactQuill>
    </div>
  );
};
export default Editor;
