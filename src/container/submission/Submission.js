import React, { useState } from "react";
import "./Submission.css";
import { db } from "../../squad-config";

// material-ui components
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CreateGroup from "../../components/createGroup/CreateGroup";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  IconBtn: {
    color: "green",
    marginTop: theme.spacing(1),
  },
  btn: {
    marginTop: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(76, 175, 80, 0.3)",
  },
  iconCloseBtn: {
    boxShadow: "0px 0px 5px lightgrey",
    marginBottom: "10px",
  },
}));

function Submission(props) {
  const classes = useStyles();

  // function to retun to the previous section
  const previous = () => {
    props.navigation.previous();
  };
  const {
    commValue,
    setCommValue,
    creativeValue,
    setCreativeValue,
    collabValue,
    setCollabValue,
    technicalValue,
    setTechnicalValue,
    codingValue,
    setCodingValue,
    analysisValue,
    setAnalysisValue,
    user,
  } = props;
  const average = Math.round(
    (parseInt(commValue) +
      parseInt(creativeValue) +
      parseInt(collabValue) +
      parseInt(technicalValue) +
      parseInt(codingValue) +
      parseInt(analysisValue)) /
      6
  );

  // function to create a group
  const [openBackdrop, setOpenBackdrop] = useState(false);

  // function to submit to the database
  const submitSurvey = () => {
    db.collection("users")
      .doc(user.uid)
      .update({
        analysisSkills: analysisValue,
        codingSkills: codingValue,
        collaborativeSkills: collabValue,
        communicationSkills: commValue,
        technicalSkills: technicalValue,
        creativitySkills: creativeValue,
        uid: user.uid,
        username: user.displayName,
        profilePhoto: user.photoURL,
        isGrouped: false,
        averageSkill: average,
        isRegistered: true,
        groups: [],
      })
      .then(() => {
        alert("you have been successfully registered");
      });

    setAnalysisValue("");
    setCodingValue("");
    setCollabValue("");
    setCreativeValue("");
    setTechnicalValue("");
    setCommValue("");
  };
  // console.log(user);
  // console.log(analysisValue);

  // export dummy function
  const trialFunction = () => {
    console.log("hello world");
  };
  return (
    <div className="submissions">
      <div style={{ textAlign: "center" }}>
        {" "}
        <p className="submissions-title"> survey summary </p>
      </div>
      <div>
        <div className="sub-skills">
          <p className="sb-skill-p">communication skills:</p>
          {commValue === "5" ? (
            <p>very strong</p>
          ) : commValue === "4" ? (
            <p>strong</p>
          ) : commValue === "3" ? (
            <p>moderate</p>
          ) : commValue === "2" ? (
            <p>weak</p>
          ) : commValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
        <div className="sub-skills">
          <p className="sb-skill-p">creativity skills:</p>
          {creativeValue === "5" ? (
            <p>very strong</p>
          ) : creativeValue === "4" ? (
            <p>strong</p>
          ) : creativeValue === "3" ? (
            <p>moderate</p>
          ) : creativeValue === "2" ? (
            <p>weak</p>
          ) : creativeValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
        <div className="sub-skills">
          <p className="sb-skill-p">collaborative skills: </p>
          {collabValue === "5" ? (
            <p>very strong</p>
          ) : collabValue === "4" ? (
            <p>strong</p>
          ) : collabValue === "3" ? (
            <p>moderate</p>
          ) : collabValue === "2" ? (
            <p>weak</p>
          ) : collabValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
        <div className="sub-skills">
          <p className="sb-skill-p">technical skills: </p>
          {technicalValue === "5" ? (
            <p>very strong</p>
          ) : technicalValue === "4" ? (
            <p>strong</p>
          ) : technicalValue === "3" ? (
            <p>moderate</p>
          ) : technicalValue === "2" ? (
            <p>weak</p>
          ) : technicalValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
        <div className="sub-skills">
          <p className="sb-skill-p">coding skills: </p>
          {codingValue === "5" ? (
            <p>very strong</p>
          ) : codingValue === "4" ? (
            <p>strong</p>
          ) : codingValue === "3" ? (
            <p>moderate</p>
          ) : codingValue === "2" ? (
            <p>weak</p>
          ) : codingValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
        <div className="sub-skills">
          <p className="sb-skill-p">analysis skills: </p>
          {analysisValue === "5" ? (
            <p>very strong</p>
          ) : analysisValue === "4" ? (
            <p>strong</p>
          ) : analysisValue === "3" ? (
            <p>moderate</p>
          ) : analysisValue === "2" ? (
            <p>weak</p>
          ) : analysisValue === "1" ? (
            <p>very weak</p>
          ) : (
            <p>you havent made a selection</p>
          )}
        </div>
      </div>
      <div className="sub-skills">
        <p className="sb-skill-p">username</p>
        <p> {user.displayName}</p>
      </div>
      <div className="sub-skills">
        <p className="sb-skill-p">user id</p>
        <p>{user.uid}</p>
      </div>
      <div className="sub-skills">
        <p className="sb-skill-p">profile photo url </p>
        <p className="sb-skill-value"> {user.photoURL}</p>
      </div>
      <div className="sb-avarage">
        <h3> your average skill level is: </h3>
        {(() => {
          switch (average) {
            case 5:
              return <p className="sb-skill-p"> very Strong</p>;
            case 4:
              return <p className="sb-skill-p"> strong</p>;
            case 3:
              return <p className="sb-skill-p"> moderate</p>;
            case 2:
              return <p className="sb-skill-p"> weak</p>;
            case 1:
              return <p className="sb-skill-p"> very weak</p>;
            default:
              return null;
          }
        })()}
      </div>
      {(commValue === "5" || commValue === "4") &&
      (collabValue === "5" || collabValue === "4") ? (
        <div className="sb-create-grp">
          <p className="sb-ct-gp">
            basing on your skills you have been chosen to be the group leader
          </p>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className={classes.btn}
            onClick={() => setOpenBackdrop(true)}
          >
            Create Group
          </Button>
          <Backdrop open={openBackdrop} className={classes.backdrop}>
            <div className="sb-backdrop">
              <CreateGroup
                setOpenBackdrop={setOpenBackdrop}
                submitSurvey={submitSurvey}
                // submitAdminDetails={trialFunction}
              />
              <div className="sb-close">
                <IconButton
                  className={classes.iconCloseBtn}
                  onClick={() => setOpenBackdrop(false)}
                >
                  <CloseIcon color="secondary" />
                </IconButton>
              </div>
            </div>
          </Backdrop>
        </div>
      ) : null}

      <div className="sb-btns">
        <div>
          <IconButton onClick={previous} className={classes.IconBtn}>
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={submitSurvey}
          // onClick={trialFunction()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Submission;
