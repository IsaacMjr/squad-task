import React, { useState, useEffect } from "react";
import OtherLink from "../../container/otherLink/OtherLink";
import { db } from "../../squad-config";
import "./OtherGroup.css";

function OtherGrp({ userDetails }) {
  // fetch the groups of lecturers
  const { details } = userDetails;
  const [groups, setGroup] = useState([
    {
      id: "",
      groupData: {},
    },
  ]);

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

  return (
    <div className="other-root">
      {groups[0].id === "" ? (
        <p> loading</p>
      ) : (
        groups.map((group, id) => <OtherLink groups={group} key={id} />)
        // <h1> loo</h1>
      )}
    </div>
  );
}

export default OtherGrp;
