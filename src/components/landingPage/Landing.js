import React from "react";
import "./Landing.css";

import grp from "../../assets/grp.png";
import Button from "@material-ui/core/Button";
import {useNavigate} from "react-router-dom"

function Landing({ signInWithGoogle }) {

  const navigate = useNavigate()
  const selectSignIn=()=>{
    navigate("/auth-option")
  }
  return (
    <div className="landing">
      <div className="land-d1-txt">
        <div className="d1-txt">
          <p className="d1-pgh">working in groups made easier</p>
          <p style={{ padding: "10px" }}>
            {" "}
            get assigned to groups without any form of bias to improve on your
            performance academically
          </p>
          <div className="d1-btn">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={selectSignIn}
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
      {/*  image of the front page */}
      <div className="land-d2">
        <img src={grp} alt="teamwork" />
      </div>
      {/*  end of frontpage image */}
    </div>
  );
}

export default Landing;
