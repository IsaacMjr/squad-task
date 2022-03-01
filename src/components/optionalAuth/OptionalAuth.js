import React from "react";
import "./OptionalAuth.css";
import { useNavigate } from "react-router-dom";

// media assets
import student from "../../assets/student.png";
import teacher from "../../assets/teacher.png";
import { Button } from "@material-ui/core";

// main
function OptionalAuth() {
  const navigate = useNavigate();
  const studentRedirect = () => {
    navigate("/auth-option/student");
  };
  const teacherRedirect = () => {
    navigate("https://lecturersquadtask.web.app/");
  };
  return (
    <div className="optional">
      <div className="opt-container">
        <div className="opt-container-options">
          <img src={student} alt="student" />
          <Button variant="contained" color="primary" onClick={studentRedirect}>
            student
          </Button>
        </div>
        <div className="opt-container-options">
          <img src={teacher} alt="teacher" />
          <Button variant="contained" color="primary">
            <a href="https://lecturer-squadtask.web.app/">lecturer</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default OptionalAuth;
