import React, { useState } from "react";
import "./Traits.css";

import SoftSkills from "../softSkills/SoftSkills";
import TechnicalSkills from "../technicalSkills/TechnicalSkills";
import { useStep } from "react-hooks-helper";
import Submission from "../submission/Submission";

function Traits({ user }) {
  // navigation props
  const steps = [
    { id: "softSkills" },
    { id: "technicalSkills" },
    { id: "submission" },
  ];
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  // start the soft skills

  const [commValue, setCommValue] = useState("");

  const [creativeValue, setCreativeValue] = useState("");

  const [collabValue, setCollabValue] = useState("");
  //  end of soft skills

  // start of the technical skills
  const [technicalValue, setTechnicalValue] = useState("");
  const [codingValue, setCodingValue] = useState("");
  const [analysisValue, setAnalysisValue] = useState("");
  // props
  const props = {
    navigation,
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
  };

  switch (step.id) {
    case "softSkills":
      return <SoftSkills {...props} />;
    case "technicalSkills":
      return <TechnicalSkills {...props} />;
    case "submission":
      return <Submission {...props} />;
    default:
      return;
  }
}

export default Traits;
