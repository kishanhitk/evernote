import { Divider, List } from "@material-ui/core";
import { Button, makeStyles } from "@material-ui/core";
import { setTimeout } from "node:timers";
import React, { useState } from "react";
import { FormEvent } from "react";
import { Notes } from "../../Notes";
import SidebarItem from "../sidebaritem/SidebarItem";
interface SidebarProps {
  notes: Notes[];
  selectedNoteIndex: number;
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  newNoteBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#29487d",
    color: "white",
    "&:hover": {
      backgroundColor: "#88a2ce",
    },
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    float: "left",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  newNoteInput: {
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)",
    },
  },
  newNoteSubmitBtn: {
    width: "100%",
    backgroundColor: "#28787c",
    borderRadius: "0px",
    color: "white",
  },
}));
const Sidebar = ({ notes, selectedNoteIndex }: SidebarProps) => {
  const [addingNotes, setaddingNotes] = useState(false);
  const [title, settitle] = useState("");
  const classes = useStyles();
  const addNewNote = () => {
    settitle("");
    setaddingNotes(!addingNotes);
  };
  const deleteNote = () => {};
  const selectNote = () => {};
  const updateTitle = (txt: string) => {};
  return (
    <div className={classes.sidebarContainer}>
      <Button className={classes.newNoteBtn} onClick={addNewNote}>
        {addingNotes ? "Cancel" : "Add note"}
      </Button>
      {addingNotes ? (
        <div>
          <input
            className={classes.newNoteInput}
            type="text"
            placeholder="Enter Note Title"
            onKeyUp={(e: any) => {
              updateTitle(e.target.value);
            }}
          ></input>
        </div>
      ) : (
        <div></div>
      )}
      <List>
        {notes.map((_note, _idx) => {
          return (
            <div key={_idx}>
              <SidebarItem
                deleteNote={deleteNote}
                note={_note}
                index={_idx}
                selectNote={selectNote}
                selectedNoteIndex={selectedNoteIndex}
              ></SidebarItem>
              <Divider></Divider>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Sidebar;
