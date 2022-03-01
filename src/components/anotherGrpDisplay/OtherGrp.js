import React, { useState, useEffect } from "react";
import OtherLink from "../../container/otherLink/OtherLink";
import { db } from "../../squad-config";
import "./OtherGroup.css";

function OtherGrp({ userDetails }) {
  // fetch the groups of lecturers
  const { details } = userDetails;
  const [groups, setGroup] = useState([]);

  useEffect(() => {
    if (!details.courseunit) {
      console.log("not there");
    } else {
      db.collection("groups")
        .where("groupCourseUnit", "==", details.courseunit)
        .onSnapshot((snapshot) => {
          setGroup(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              groupData: doc.data(),
            }))
          );
        });
    }
  }, [details]);
  console.log(groups);

  return (
    <div className="other-root">
      {groups.length !== 0 ? (
        groups.map((group, id) => <OtherLink groups={group} key={id} />)
      ) : (
        <p> lecturer has not created groups for this courseunit </p>
        // <h1> loo</h1>
      )}
    </div>
  );
}

export default OtherGrp;
