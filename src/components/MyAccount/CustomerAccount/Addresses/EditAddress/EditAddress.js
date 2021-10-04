import React from "react";
import { Form, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../../../../../common/http";
import { AuthContext } from "../../../../../common/context/Auth.context";

const EditAddress = (props) => {
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
      .patch(`/api/users/${user._id}/address/${type}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.history.push("/my-account/customer/address-list");
      })
      .catch((err) => console.log(err.message));
    //TODO: set proper error handling
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {

        const address =
          type === "billing"
            ? response.data.addresses.billing
            : response.data.addresses.shipping;

        setFirstName(address.firstName);
        setLastName(address.lastName);
        setEmail(address.email);
        setPhone(address.phone);
        setCompany(address.company);
        setStreet(address.street);
        setCity(address.city);
        setProvince(address.province);
        setZip(address.zip);
        setCountry(address.country);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          required
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          required
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control
          required
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          required
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Province</Form.Label>
        <Form.Control
          required
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Postcode</Form.Label>
        <Form.Control
          required
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          required
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditAddress;
