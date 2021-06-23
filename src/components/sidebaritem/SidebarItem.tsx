import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { removeHTMLTags } from "../../helper";
import { Note } from "../../Notes";
import { DeleteOutline } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
}));
interface SidebarItemProp {
  note: Note;
  index: number;
  selectedNoteIndex: number;
  selectNote: Function;
  deleteNote: Function;
}
const SidebarItem = ({
  note,
  index,
  selectedNoteIndex,
  selectNote,
  deleteNote,
}: SidebarItemProp) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substr(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteOutline
          onClick={() => {
            deleteNote(note);
          }}
          className={classes.deleteIcon}
        ></DeleteOutline>
      </ListItem>
    </div>
  );
};

export default SidebarItem;
