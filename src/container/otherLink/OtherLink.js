import React from "react";
import "./OtherLink.css";
import { useNavigate } from "react-router-dom";

// material-ui components
import Button from "@material-ui/core/Button";

function OtherLink({ groups }) {
  const { id, groupData } = groups;
  const navigate = useNavigate();

  const visitGroup = () => {
    navigate(`/group/${id}`);
  };
  return (
    <div className="link-root">
      {groupData.groupLogo ? (
        <img src={groupData.groupLogo} alt="" className="link-logo" />
      ) : (
        <img
          className="link-logo"
          src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
          alt=""
        />
      )}
      {groupData.groupName ? (
        <h4> {groupData.groupName} </h4>
      ) : (
        <h4>loading</h4>
      )}
      <div className="link-btn">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={visitGroup}
        >
          view group
        </Button>
      </div>
    </div>
  );
}

export default OtherLink;
