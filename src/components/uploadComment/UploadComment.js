import React, { useState } from "react";
import "./Upload.css";
import { db } from "../../squad-config";
import firebase from "firebase/compat/app"

// importing material-ui components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "45vw",
    marginRight: "10px",
    marginLeft: "10px",
    borderColor: "green",
  },
}));
function UploadComment({ groupId, user }) {
  const classes = useStyles();

  // function to upload the comments
  const [inputValue, setInputValue] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const sendMessage = () => {
    db.collection("groups")
      .doc(groupId)
      .collection("messages")
      .add({
        username: user.displayName,
        userImage: user.photoURL,
        message: inputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setOpenSnack(true);
        setInputValue("");
      })
      .catch((error) => error.message);
  };

  return (
    <div className="upload">
      <div className="up-container">
        <TextField
          label="type message"
          className={classes.textField}
          variant="filled"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          send
        </Button>
      </div>
      <Snackbar
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={1000}
      >
        <Alert severity="success">message has been sent</Alert>
      </Snackbar>
    </div>
  );
}

export default UploadComment;
