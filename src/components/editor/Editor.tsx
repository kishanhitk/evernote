import { makeStyles, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import debounce from "../../hepler";
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
const Editor = () => {
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [id, setid] = useState("");
  const classes = useStyles();
  const updateBody = (val: string) => {
    settext(val);
    update();
  };
  const update = debounce(() => {
    console.log("Updaring DB");
  }, 1500);
  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};
export default Editor;
