import axiosInstance from "../../../../../common/http/index";
import UserCard from "../../../../UserCard/UserCard";
import { useState, useEffect } from "react";
import Swal from "sweetalert2/src/sweetalert2";
import ReactPaginate from "react-paginate";
import { Row, Col } from "react-bootstrap";

import './UsersListAdmin.css'

const UsersListAdmin = (props) => {
  const { users, setUsers } = props;

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const storedToken = localStorage.getItem("authToken");

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage))
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `User ${name} has been deleted.`, "success");

        axiosInstance
          .delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const newUsers = users.filter((user) => user._id !== id);
            setUsers(newUsers);
            getData();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;

      const slice = data.slice(offset, offset + perPage);

      const postData = slice.map((user) => (
        <UserCard key={user._id} userData={user} handleDelete={handleDelete} />
      ));

      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/users`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((err) => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="users-list-admin" className="container">
      <div>
        <Row id="head-users-list">
          <Col xs={12} sm={3} lg={3}>
            <p>Email</p>
          </Col>
          <Col xs={12} sm={2} lg={2}>
            <p>Created at</p>
          </Col>
          <Col xs={12} sm={1} lg={1}>
            <p className="text-center">Admin</p>
          </Col>
          <Col xs={12} sm={3} lg={3}>
            <p>ID</p>
          </Col>
          <Col xs={12} sm={3} lg={3}>
            <p className="text-center">Actions</p>
          </Col>
        </Row>
        {data}
      </div>
      <div className="paginate-cat">
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeclassname={"active"}
      />
      </div>
    </div>
  );
};

export default UsersListAdmin;
