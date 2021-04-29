import { makeStyles } from "@material-ui/core";
import React from "react";
import { Notes } from "../../Notes";
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
  note: Notes;
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
  return <div></div>;
};

export default SidebarItem;
