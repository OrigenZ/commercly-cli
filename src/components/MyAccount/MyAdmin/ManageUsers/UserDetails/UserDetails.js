// import { AuthContext } from "../../../common/context/Auth.context";
import { ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../common/http/index";

const UserDetails = (params) => {
  // const {product, setProduct}= useState([]);

  const [user, setUser] = useState("");

  // const [errorMessage, setErrorMessage] = useState('')
  const { id } = params.match.params;
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axiosInstance
      .get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);

        console.log("user data", response.data);
        console.log("user.addresses", user.addresses);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="section">
      <ListGroup>
        <ListGroup.Item>Name: {user.name}</ListGroup.Item>

        <ListGroup.Item>Surname: {user.surname}</ListGroup.Item>

        <ListGroup.Item>Username: {user.username}</ListGroup.Item>

        <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>

        <ListGroup.Item>Email: {user.email}</ListGroup.Item>

        <ListGroup.Item>
          Billing Address:
          {user.addresses && user.addresses.billing && (
            <>
              <p>First name: {user.addresses.billing.firstName}</p>
              <p>Last name: {user.addresses.billing.lastName}</p>
              <p>Email: {user.addresses.billing.email}</p>
              <p>Phone: {user.addresses.billing.phone}</p>
              <p>Company: {user.addresses.billing.company}</p>
              <p>Street: {user.addresses.billing.street}</p>
              <p>City: {user.addresses.billing.city}</p>
              <p>Province:{user.addresses.billing.province}</p>
              <p>Postcode: {user.addresses.billing.zip}</p>
              <p>Country: {user.addresses.billing.country}</p>
            </>
          )}
        </ListGroup.Item>

        <ListGroup.Item>
          Shipping Address:
          {user.addresses && user.addresses.shipping && (
            <>
              <p>First name: {user.addresses.shipping.firstName}</p>
              <p>Last name: {user.addresses.shipping.lastName}</p>
              <p>Email: {user.addresses.shipping.email}</p>
              <p>Phone: {user.addresses.shipping.phone}</p>
              <p>Company: {user.addresses.shipping.company}</p>
              <p>Street: {user.addresses.shipping.street}</p>
              <p>City: {user.addresses.shipping.city}</p>
              <p>Province:{user.addresses.shipping.province}</p>
              <p>Postcode: {user.addresses.shipping.zip}</p>
              <p>Country: {user.addresses.shipping.country}</p>
            </>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default UserDetails;
