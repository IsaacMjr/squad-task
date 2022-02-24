import React, { useState } from "react";
import "./CreateGroup.css";
import { db } from "../../squad-config";

// material ui components
import TextField from "@material-ui/core/TextField";
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "50%",
  },
  btn: {
    marginTop: theme.spacing(1),
    width: "40%",
  },
}));
function CreateGroup({ setOpenBackdrop, submitSurvey }) {
  const classes = useStyles();
  const [grpName, setGrpName] = useState("");
  const [grpLink, setGrpLink] = useState("");
  const [grpUnit, setGrpUnit] = useState("");

  // function to create groups
  const createGroup = () => {
    db.collection("groups")
      .add({
        groupName: grpName,
        groupLogo: grpLink,
        groupCourseUnit: grpUnit,
        groupMembers: [],
        memberTraits: [],
      })
      .then(() => {
        setGrpLink("");
        setGrpName("");
        setGrpUnit("");
        setOpenBackdrop(false);
        alert(`you have created group${grpName}`);
      })
      .then(() => {
        submitSurvey();
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="create">
      <div></div>
      <p className="create-title"> create group</p>
      <TextField
        label="group name"
        className={classes.textfield}
        value={grpName}
        onChange={(e) => setGrpName(e.target.value)}
      />
      <TextField
        label="paste a link of the group image"
        className={classes.textfield}
        value={grpLink}
        onChange={(e) => setGrpLink(e.target.value)}
      />

      <FormControl
        style={{ width: "250px", marginTop: "10px" }}
        className={classes.margin}
      >
        <InputLabel id="select-course">course unit </InputLabel>
        <Select
          labelId="select-course"
          value={grpUnit}
          onChange={(e) => setGrpUnit(e.target.value)}
        >
          <MenuItem value="emerging trends"> emerging trends</MenuItem>
          <MenuItem value="research methodology">research methodology</MenuItem>
          <MenuItem value="communication skills">communication skills</MenuItem>
          <MenuItem value="integrative programming">
            integrative programming
          </MenuItem>
          <MenuItem value="intelligent systems">intelligent systems</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        className={classes.btn}
        disabled={!grpName || !grpLink || !grpUnit}
        onClick={createGroup}
      >
        {" "}
        create group
      </Button>
    </div>
  );
}

export default CreateGroup;
