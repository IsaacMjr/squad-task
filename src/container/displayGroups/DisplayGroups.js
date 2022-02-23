import React from "react";
import "./displayGroups.css";
import GroupLink from "../../components/groupLink/GroupLink";

function DisplayGroups({ groups, userDetails }) {
  const { details } = userDetails;
  // console.log(details);
  return (
    <div className="displayGroups">
      {groups ? (
        groups.map((group, id) => {
          const check = group.groups.memberTraits;
          if (!check.includes(details.averageSkill.toString())) {
            return <GroupLink key={id} group={group} />;
          } else {
            console.log("no");
          }
        })
      ) : (
        <h1> loading ...</h1>
      )}
      {/* <h1> heyyy</h1> */}
    </div>
  );
}

export default DisplayGroups;
