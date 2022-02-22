import React, { useEffect, useState } from "react";
import "./Admin.css";
import { db } from "../../squad-config";
import { CircularProgress } from "@material-ui/core";

function Admin({ groups }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="admin">
      <div className="admin-grpNo">
        {groups.length === 0 ? (
          <CircularProgress />
        ) : (
          <div className="admin-grNo-ct">
            <h3> number of groups</h3>
            <div>
              <p>{groups.length}</p>&nbsp;
              <p> groups</p>
            </div>
          </div>
        )}
      </div>
      <div className="admin-grpNo">
        {users.length === 0 ? (
          <CircularProgress />
        ) : (
          <div className="admin-grNo-ct">
            <h3> number of students</h3>
            <div>
              <p>{users.length}</p>&nbsp;
              <p> users</p>
            </div>
          </div>
        )}
      </div>
      <div className="admin-grpNo">
        <h2> number of grouped students</h2>
      </div>
    </div>
  );
}

export default Admin;
