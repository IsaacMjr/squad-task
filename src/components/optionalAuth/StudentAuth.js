import React, { useState } from "react";
import "./StudentAuth.css";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../squad-config";

// material-ui components
import Backdrop from "@material-ui/core/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import {
  IconButton,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// styling
const useStyles = makeStyles({
  margin: {
    marginTop: "10px",
  },
});

function StudentAuth() {
  const classes = useStyles();
  const [open] = useState(true);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [courseunit, setCourseunit] = useState("");
  const [username, setUsername] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const navigate = useNavigate();

  const closePage = () => {
    navigate("/auth-option");
  };

  // authentication with google
  const authUser = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        user.user.updateProfile({
          displayName: username,
        });
        db.collection("users").doc(user.user.uid).set({
          username: username,
          studentNumber: studentNumber,
          yearOfstudy: year,
          semester: semester,
          course: course,
          courseunit: courseunit,
        });
        navigate("/");
      })
      .then(() => {
        setUsername("");
        setStudentNumber("");
        setYear("");
        setSemester("");
        setCourse("");
        setCourseunit("");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Backdrop open={open} style={{ zIndex: "1" }}>
      <div className="studnet">
        <div className="student-bio">
          <TextField
            label="student name"
            size="small"
            style={{ width: "20vw", marginLeft: "5px" }}
            className={classes.margin}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label=" student number"
            size="small"
            style={{ width: "20vw", marginLeft: "5px" }}
            className={classes.margin}
            type="number"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
          />
          <div>
            <FormControl
              style={{ width: "120px", marginLeft: "5px" }}
              className={classes.margin}
            >
              <InputLabel id="select-year"> year of study</InputLabel>
              <Select
                labelId="select-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value={1}> one</MenuItem>
                <MenuItem value={2}> two</MenuItem>
                <MenuItem value={3}> three</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{ width: "120px", marginLeft: "5px" }}
              className={classes.margin}
            >
              <InputLabel id="select-year"> semester </InputLabel>
              <Select
                labelId="select-year"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <MenuItem value={1}> one</MenuItem>
                <MenuItem value={2}> two</MenuItem>
              </Select>
            </FormControl>
          </div>

          <FormControl
            style={{ width: "250px", marginLeft: "5px" }}
            className={classes.margin}
          >
            <InputLabel id="select-course">course </InputLabel>
            <Select
              labelId="select-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <MenuItem value="bist"> bist</MenuItem>
              <MenuItem value="computer science"> computer science</MenuItem>
              <MenuItem value="software engineering">
                software engineering
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ width: "250px", marginLeft: "5px" }}
            className={classes.margin}
          >
            <InputLabel id="select-course">course unit </InputLabel>
            <Select
              labelId="select-course"
              value={courseunit}
              onChange={(e) => setCourseunit(e.target.value)}
            >
              <MenuItem value="emerging trends"> emerging trends</MenuItem>
              <MenuItem value="research methodology">
                research methodology
              </MenuItem>
              <MenuItem value="communication skills">
                communication skills
              </MenuItem>
              <MenuItem value="integrative programming">
                integrative programming
              </MenuItem>
              <MenuItem value="intelligent systems">
                intelligent systems
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="student-button">
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={authUser}
            disabled={
              !username ||
              !studentNumber ||
              !year ||
              !semester ||
              !course ||
              !courseunit
            }
          >
            {" "}
            sign in with google
          </Button>
        </div>
        <div className="student-close">
          <IconButton onClick={closePage}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
      </div>
    </Backdrop>
  );
}

export default StudentAuth;
