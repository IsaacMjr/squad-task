import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  Iconbtn: {
    color: "green",
  },
}));

function TechnicalSkills(props) {
  const classes = useStyles();
  // handle the snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const previous = () => {
    props.navigation.previous();
  };

  const next = () => {
    if (technicalValue === "" || codingValue === "" || analysisValue === "") {
      setOpen(true);
    } else {
      props.navigation.next();
    }
  };
  // handle technical skills
  const technicalValue = props.technicalValue;
  const setTechnicalValue = props.setTechnicalValue;
  const codingValue = props.codingValue;
  const setCodingValue = props.setCodingValue;
  const analysisValue = props.analysisValue;
  const setAnalysisValue = props.setAnalysisValue;
  return (
    <div>
      <h1> This is the technical Skills part</h1>
      <div>
        <div className="softSkills">
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Technical Skills</FormLabel>
              <RadioGroup
                aria-label="technical skills"
                value={technicalValue}
                onChange={(e) => setTechnicalValue(e.target.value)}
              >
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="very strong"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Strong"
                />
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
            {/* <h1>{technicalValue}</h1> */}
          </div>
          {/* creative skills */}
          <div className="soft-creat-skills">
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Programming skills</FormLabel>
                <RadioGroup
                  aria-label="Programming skills"
                  value={codingValue}
                  onChange={(e) => setCodingValue(e.target.value)}
                >
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="very strong"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Strong"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="moderate"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="weak"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="very weak"
                  />
                </RadioGroup>
              </FormControl>
              {/* <h1>{codingValue}</h1> */}
            </div>
          </div>
          <div className="soft-collab-skills">
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Analysis Skills</FormLabel>
                <RadioGroup
                  aria-label="technical skills"
                  value={analysisValue}
                  onChange={(e) => setAnalysisValue(e.target.value)}
                >
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="very strong"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Strong"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="moderate"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="weak"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="very weak"
                  />
                </RadioGroup>
              </FormControl>
              {/* <h1>{analysisValue}</h1> */}
            </div>
          </div>
        </div>
        <IconButton onClick={previous} className={classes.Iconbtn}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={next} className={classes.Iconbtn}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <MuiAlert severity="error">make all selections please</MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default TechnicalSkills;
