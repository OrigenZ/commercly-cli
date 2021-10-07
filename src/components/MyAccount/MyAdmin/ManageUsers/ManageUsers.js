import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../common/http";
import UsersListAdmin from "./UsersListAdmin/UsersListAdmin";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axiosInstance("/api/users", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err.message));
    //TODO: set proper error handling

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UsersListAdmin users={users} setUsers={setUsers} />;
};

export default ManageUsers;
