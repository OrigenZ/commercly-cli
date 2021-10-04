import React from "react";
import { Form, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../../../../../common/http";
import { AuthContext } from "../../../../../common/context/Auth.context";

const NewAddress = (props) => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const type = props.match.params.type;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      phone,
      company,
      street,
      city,
      zip,
      province,
      country,
    };
    axiosInstance
      .post(`/api/users/${user._id}/new-address/${type}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.history.push("/my-account/customer/address-list");
      })
      .catch((err) => console.log(err.message));
    //TODO: set proper error handling
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Province</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setProvince(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Postcode</Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(e) => setZip(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewAddress;
