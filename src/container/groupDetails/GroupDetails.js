import React, { useEffect, useState } from "react";
import "./groupDetails.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "../../squad-config";

// import material-ui components
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

function GroupDetails({ user, userDetails }) {
  // get the params from the url
  const params = useParams();
  // testing the params
  // console.log(params.groupId);
  // group info state
  const [groupInfo, setGroupInfo] = useState([]);

  useEffect(() => {
    db.collection("groups")
      .doc(params.groupId)
      .onSnapshot((snapshot) => {
        setGroupInfo(snapshot.data());
      });
  }, []);

  // function to join the group
  const joinGroup = () => {
    const memberTraits = userDetails.details.averageSkill;
    db.collection("groups")
      .doc(params.groupId)
      .update({
        groupMembers: firebase.firestore.FieldValue.arrayUnion({
          memberId: user.uid,
          memberName: user.displayName.toLowerCase(),
          memberTrait: userDetails.details.averageSkill,
        }),
        memberTraits: firebase.firestore.FieldValue.arrayUnion(
          `${memberTraits}`
        ),
      })
      .then(() => {
        db.collection("users")
          .doc(userDetails.id)
          .update({
            isGrouped: true,
            groups: firebase.firestore.FieldValue.arrayUnion({
              groupId: params.groupId,
              groupLogo: groupInfo.groupLogo,
              groupName: groupInfo.groupName,
            }),
          });
      })
      .then(() => {
        alert(`you joined group ${groupInfo.groupName}`);
      })
      .catch((error) => console.log(error.message));
  };
  // console.log(groupInfo);
  return (
    <div className="groupDetails">
      {groupInfo.length === 0 ? (
        <div> this is the error handling div</div>
      ) : (
        <>
          <div className="grp-details">
            <div
              className="grp-image-cont"
              style={{
                backgroundImage: `url(${groupInfo.groupLogo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="grp-name-btn">
            <div>
              <p className="grp-name">{groupInfo.groupName}</p>
              <div className="">
                {groupInfo.groupMembers ? (
                  <p className="grp-nm-part">
                    {groupInfo.groupMembers.length}&nbsp;participants
                  </p>
                ) : (
                  <p> no member</p>
                )}
              </div>
              <div>
                {groupInfo.groupCourseUnit ? (
                  <p className="grp-nm-part">{groupInfo.groupCourseUnit}</p>
                ) : (
                  <p className="grp-nm-part"> course unit</p>
                )}
              </div>
            </div>
            {groupInfo ? (
              groupInfo.groupMembers.some(
                (member) => member.memberId === user.uid
              ) ? (
                <Link to={`/groupRoom/${params.groupId}`}>
                  <Button variant="contained">
                    <p className="btn-link">visit group</p>
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={joinGroup}
                >
                  join group
                </Button>
              )
            ) : (
              <p>okay</p>
            )}
          </div>
          <div className="grp-desc">group description</div>
        </>
      )}
    </div>
  );
}

export default GroupDetails;
