import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import Swal from 'sweetalert2/src/sweetalert2'
import axiosInstance from "../../../../common/http";
import UsersListAdmin from "./UsersListAdmin/UsersListAdmin";

import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getUsers = async () => {
    try {
      const response = await axiosInstance("/api/users", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setUsers(response.data);
    } catch (err) { console.log(err.message) }

  }

  const handleDelete = async (id, name) => {
    const input = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    })

    if (input.isConfirmed) {
      try {
        Swal.fire('Deleted!', `User ${name} has been deleted.`, 'success')
        await axiosInstance.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      }
    }
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row id="manage-users" xs={12}>
        <UsersListAdmin users={users} handleDelete={handleDelete} />
      </Row>
    </Container>
  )
};

export default ManageUsers;