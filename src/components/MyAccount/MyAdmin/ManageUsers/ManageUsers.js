import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../common/http";

const ManageUsers = () => {
  const [ users, setUsers ] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axiosInstance("/api/users", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        console.log("response", response);
        setUsers(response.data);
      })
      .catch((err) => console.log(err.message));
    //TODO: set proper error handling
  });

  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          {users &&
            users.map((user) => (
              <div key={user._id}>
                <div>
                  <p>User id: {user._id}</p>
                  <p>Name: {user.name}</p>
                  <p>Lastname {user.surname}</p>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Created: {user.createdAt}</p>

                  {/* <div>
              <h4>Billing address:</h4>
                <p>Name: {user.addresses.billing.firstName}</p>
                <p>Lastname {user.addresses.billing.lastName}</p>
                <p>Username: {user.addresses.billing.username}</p>
                <p>Email: {user.addresses.billing.email}</p>
                <p>Phone: {user.addresses.billing.phone}</p>
                <p>Company: {user.addresses.billing.company}</p>
                <p>Street: {user.addresses.billing.street}</p>
                <p>City: {user.addresses.billing.city}</p>
                <p>Province: {user.addresses.billing.province}</p>
                <p>Postcode: {user.addresses.billing.zip}</p>
                <p>Country: {user.addresses.billing.country}</p>
              </div> */}

                  <div>
                    <h4>Shipping address:</h4>
                    <p>Name: {user.addresses.shipping.firstName}</p>
                    <p>Lastname {user.addresses.shipping.lastName}</p>
                    <p>Username: {user.addresses.shipping.username}</p>
                    <p>Email: {user.addresses.shipping.email}</p>
                    <p>Phone: {user.addresses.shipping.phone}</p>
                    <p>Company: {user.addresses.shipping.company}</p>
                    <p>Street: {user.addresses.shipping.street}</p>
                    <p>City: {user.addresses.shipping.city}</p>
                    <p>Province: {user.addresses.shipping.province}</p>
                    <p>Postcode: {user.addresses.shipping.zip}</p>
                    <p>Country: {user.addresses.shipping.country}</p>
                  </div>

                  <br />
                </div>
                <div>
                  <button>Edit</button> <button>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
