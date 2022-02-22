import React from "react";
import GroupLink from "../../components/groupLink/GroupLink";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cont: {
    display: "flex",
    flexWrap: "wrap",
  },
});

function DisplayChatroom({ userDetails }) {
  const { id, details } = userDetails;
  const classes = useStyles();

  return (
    <div className={classes.cont}>
      {details.groups.length === 0 ? (
        <p>loading</p>
      ) : (
        details.groups.map((group, id) => (
          <GroupLink chatInfo={group} key={id} />
        ))
      )}
    </div>
  );
}

export default DisplayChatroom;
