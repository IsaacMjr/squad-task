import React from "react";
import "./Home.css";
import Traits from "../../container/traits/Traits";
import DisplayGroups from "../../container/displayGroups/DisplayGroups";
import DisplayChatroom from "../../container/displayChatrooms/DisplayChatroom";

function Home({ user, userDetails, groups }) {
  const { id, details } = userDetails;

  return (
    <div className="home">
      {details.isRegistered === true && details.isGrouped === true ? (
        <DisplayChatroom userDetails={userDetails} />
      ) : details.isRegistered === true && details.isGrouped === false ? (
        <>
          {groups.length === 0 ? (
            <h1> loading....</h1>
          ) : (
            <DisplayGroups groups={groups} userDetails={userDetails} />
          )}
        </>
      ) : (
        <Traits user={user} />
      )}
    </div>
  );
}

export default Home;
