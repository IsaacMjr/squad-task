import React, { useState } from "react";
import "./SoftSkills.css";

// importing the material-ui components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: theme.spacing(1),
  },
}));

function SoftSkills(props) {
  const classes = useStyles();
  // handle the snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handle the navigation to next component
  const nextskills = () => {
    if (commValue === "" || creativeValue === "" || collabValue === "") {
      setOpen(true);
    } else {
      props.navigation.next();
    }
  };
  const commValue = props.commValue;
  const setCommValue = props.setCommValue;
  const creativeValue = props.creativeValue;
  const setCreativeValue = props.setCreativeValue;
  const collabValue = props.collabValue;
  const setCollabValue = props.setCollabValue;

  return (
    <div>
      <h1> soft skills</h1>
      <div className="softSkills">
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Communication skills</FormLabel>
            <RadioGroup
              aria-label="communication skills"
              name="controlled-radio-buttons-group"
              value={commValue}
              onChange={(e) => setCommValue(e.target.value)}
            >
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="very strong"
              />
              <FormControlLabel value="4" control={<Radio />} label="strong" />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="moderate"
              />
              <FormControlLabel value="2" control={<Radio />} label="weak" />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="very weak"
              />
            </RadioGroup>
          </FormControl>
          {/* <h1>{commValue}</h1> */}
        </div>
        {/* creative skills */}
        <div className="soft-creat-skills">
          <FormControl component="fieldset">
            <FormLabel component="legend"> Creativity skills</FormLabel>
            <RadioGroup
              aria-label="creativity skills"
              value={creativeValue}
              onChange={(e) => setCreativeValue(e.target.value)}
            >
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="very strong"
              />
              <FormControlLabel value="4" control={<Radio />} label="strong" />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="moderate"
              />
              <FormControlLabel value="2" control={<Radio />} label="weak" />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="very weak"
              />
            </RadioGroup>
          </FormControl>
          {/* <h1> {creativeValue}</h1> */}
        </div>
        <div className="soft-collab-skills">
          <FormControl component="fieldset">
            <FormLabel component="legend"> Collaborative Skills</FormLabel>
            <RadioGroup
              aria-label="collaborative skills"
              value={collabValue}
              onChange={(e) => setCollabValue(e.target.value)}
            >
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="very strong"
              />
              <FormControlLabel value="4" control={<Radio />} label="strong" />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="moderate"
              />
              <FormControlLabel value="2" control={<Radio />} label="weak" />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="very weak"
              />
            </RadioGroup>
          </FormControl>
          {/* <h1>{collabValue}</h1> */}
        </div>
      </div>
      <Button
        onClick={nextskills}
        color="primary"
        variant="contained"
        className={classes.btn}
      >
        {" "}
        next
      </Button>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <MuiAlert severity="error">make all selections please</MuiAlert>
      </Snackbar>
    </div>
  );
}

export default SoftSkills;
