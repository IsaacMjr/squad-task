import React, { useEffect, useState } from "react";
import "./groupRoom.css";
import Timer from "../../components/timer/Timer";

import { useParams, Link, Routes, Route } from "react-router-dom";
import { db } from "../../squad-config";
import moment from "moment";

// material-ui components
import Avatar from "@material-ui/core/Avatar";
import UploadComment from "../../components/uploadComment/UploadComment";
import Skeleton from "@material-ui/lab/Skeleton";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

function GroupRoom({ user, userDetails, groups }) {
  const params = useParams();

  // console.log(params.groupId);
  // fetch the group messages
  const [messages, setMessages] = useState([]);
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    db.collection("groups")
      .doc(params.groupId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, messageData: doc.data() }))
        );
      });

    // fetching the timer
    db.collection("groups")
      .doc(params.groupId)
      .onSnapshot((snapshot) => {
        setDeadline(snapshot.data().deadline);
      });
  }, []);

  const trial = moment(deadline).format("ll");
  // handle the rate backdrop

  // const { path, url } = useRouteMatch();
  // console.log(useRouteMatch());

  // handle setting reminder
  const [hDate, setHDate] = useState("");

  const setReminder = () => {
    db.collection("groups")
      .doc(params.groupId)
      .update({
        deadline: hDate,
      })
      .then(() => {
        setDeadline("");
      })
      .then(() => alert("reminder has been set"))
      .catch((error) => console.log(error.message));
  };
  // console.log(userDetails);
  return (
    <div className="groupRoom">
      <div className="groupRoom-nav">
        <div className="grpRm-nav">
          <p className="grpRm-nav-name">{user.displayName}</p>

          {groups
            .filter((group) => group.id === params.groupId)
            .map((group) => {
              const { id, groups } = group;

              return (
                <div key={id}>
                  {groups.groupName ? (
                    <p className="grpRm-name">{groups.groupName}</p>
                  ) : (
                    <h3>loading</h3>
                  )}
                  <h3> participants </h3>
                  <div>
                    {groups.groupMembers.length === 0 ? (
                      <h3>loading</h3>
                    ) : (
                      groups.groupMembers.map((member, id) => (
                        <div key={id} className="grpRm-cont-member">
                          <span>
                            <p className="grpRm-member"> {member.memberName}</p>
                          </span>

                          {/* <Link to={`${url}/${member.memberName}`}> */}
                          <Tooltip title="rate">
                            <IconButton>
                              <CreateIcon />
                            </IconButton>
                          </Tooltip>
                          {/* </Link> */}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}

          <h3> the links to other groups</h3>
        </div>
        <div className="grpRm-nav-rem">
          {deadline === "" ? <p> loading</p> : <Timer deadline={trial} />}

          <input
            style={{ margin: "5px" }}
            type="datetime-local"
            min="2022-01-01T08:30"
            max="2022-12-30T16:30"
            value={hDate}
            onChange={(e) => setHDate(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={!hDate}
              onClick={setReminder}
            >
              set reminder
            </Button>
          </div>
        </div>
      </div>
      <div className="groupChat-container">
        <div className="groupChat">
          {messages.length === 0 ? (
            <div className="grpCht-error">
              <Skeleton
                animation="wave"
                variant="circle"
                width="5vw"
                height="5vh"
              />
              <div>
                <Skeleton animation="wave" variant="text" width="20vw" />
                <Skeleton animation="wave" variant="text" width="20vw" />
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const { id, messageData } = message;
              return (
                <div className="grpCht-contain" key={id}>
                  <div className="grpCht-message">
                    <Avatar src={messageData.userImage} />
                    <div className="grpCht-msg">
                      <p className="grpCht-name"> {messageData.username}</p>
                      <p className="grpCht-mesgs"> {messageData.message}</p>
                    </div>
                  </div>
                  {messageData.timestamp ? (
                    <p className="grpCht-time">
                      {moment(messageData.timestamp.toDate()).format(
                        "MMMM Do YYYY, h:mm:ss a "
                      )}
                    </p>
                  ) : (
                    <p> loading</p>
                  )}
                </div>
              );
            })
          )}
        </div>
        <UploadComment groupId={params.groupId} user={user} />
      </div>
      {/* <Routes>
        <Route path={`${path}/:memberId`} exact>
          <h1> hope u work</h1>
        </Route>
      </Routes> */}
    </div>
  );
}

export default GroupRoom;
