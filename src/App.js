import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Landing from "./components/landingPage/Landing";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { googleProvider, auth, db } from "./squad-config";
import GroupDetails from "./container/groupDetails/GroupDetails";
import GroupRoom from "./container/groupRoom/GroupRoom";
import OptionalAuth from "./components/optionalAuth/OptionalAuth"
import StudentAuth from "./components/optionalAuth/StudentAuth"
import TeacherAuth from "./components/optionalAuth/TeacherAuth"

// styling
import { makeStyles } from "@material-ui/core/styles";
import RateMember from "./container/rateMember/RateMember";
import Admin from "./components/admin/Admin";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    // zIndex: theme.zIndex.drawer + 1,
  },
}));
function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  // having user details
  const [userDetails, setUserDetails] = useState({
    id: "",
    details: {
      isRegistered: false,
      isGrouped: false,
    },
  });
  // getting the groups from the database
  const [groups, setGroups] = useState([]);
  // getting one group information

  // authentication with google
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {})
      .catch((error) => console.log(error.message));
  };

  // maintaining the state of the auth user
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        db.collection("users")
          .where("username", "==", user.displayName)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) =>
              setUserDetails({ id: doc.id, details: doc.data() })
            );
          });

        // fetch the groups from the database
        db.collection("groups").onSnapshot((snapshot) => {
          setGroups(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              groups: doc.data(),
            }))
          );
        });
      } else {
        setUser(null);
        
      }
    });
  }, [user]);

  // console.log(userDetails);

  return (
    <div className="App">
      <Router>
        <Header user={user} signInWithGoogle={signInWithGoogle} />
        {!user ? (
          <Routes>
            <Route path="/auth-option/teacher" element={<> <TeacherAuth/><OptionalAuth/></>}/>
            <Route path="/auth-option/student" element={<><StudentAuth/><OptionalAuth/></>}/>
            <Route path="/auth-option" element={<OptionalAuth/>}/>
            <Route path="/" element={<Landing user={user} />}/>            
            </Routes>
        ) : (
          <Routes>
            <Route path="/" exact>
              <Home user={user} userDetails={userDetails} groups={groups} />
            </Route>
            <Route path="/admin">
              <Admin groups={groups} />
            </Route>
            <Route path="/group/:groupId">
              <GroupDetails user={user} userDetails={userDetails} />
            </Route>
            <Route path="/groupRoom/:groupId/:memberId" exact>
              <>
                <RateMember user={user} />
                <GroupRoom
                  user={user}
                  userDetails={userDetails}
                  groups={groups}
                />
              </>
            </Route>
            <Route path="/groupRoom/:groupId">
              <GroupRoom
                user={user}
                userDetails={userDetails}
                groups={groups}
              />
            </Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
