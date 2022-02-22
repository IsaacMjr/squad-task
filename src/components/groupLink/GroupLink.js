import React from "react";
import "./GroupLink.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function GroupLink({ group, chatInfo }) {
  // console.log(chatInfo);
  return (
    <div className="groupLink">
      <div className="grpLk-img">
        {chatInfo ? (
          <img src={chatInfo.groupLogo} alt="group icon" />
        ) : (
          <img src={group.groups.groupLogo} alt="group icon" />
        )}
        {/* <img src={group.groups.groupLogo} alt="group icon" /> */}
      </div>
      <div className="grp-title">
        {/* <p> {group.groups.groupName}</p> */}
        {chatInfo ? (
          <p> {chatInfo.groupName}</p>
        ) : (
          <p> {group.groups.groupName}</p>
        )}
        <Button variant="outlined" color="default" fullWidth>
          {chatInfo ? (
            <Link to={`/groupRoom/${chatInfo.groupId}`}>proceed to group</Link>
          ) : (
            <Link to={`/group/${group.id}`}>view group</Link>
          )}
        </Button>
      </div>
    </div>
  );
}

export default GroupLink;
