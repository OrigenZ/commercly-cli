// import { AuthContext } from "../../../common/context/Auth.context";
import { Form, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../common/http/index";



const EditUser = (params) => {
  // const {product, setProduct}= useState([]);


  console.log("EditUser props", params);
/*   const [users, setUsers] = useState([]); */
  const [name, setName] = useState("");
  const [surname, setSurname] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shiAddStreet, setShiAddStreet] = useState("");
  // const [errorMessage, setErrorMessage] = useState('')

  const { id } = params.match.params;

  const storedToken = localStorage.getItem("authToken");
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, surname, username, email, phone };
    axiosInstance
      .patch(`/api/users/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        e.target.reset();
        /* history.push("/shop"); */
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axiosInstance
      .get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const foundUser = response.data;
        console.log('foundUser data', response.data)
        setName(foundUser.name || " ");
        setSurname(foundUser.surname || " ");
        setUsername(foundUser.username || " ");
        setEmail(foundUser.email || " ");
        setPhone(foundUser.phone || " ");
        setShiAddStreet(foundUser.addresses.shipping.street || " ");
console.log('EditUser response', response)
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setShiAddStreet(e.target.value)}
                  value={shiAddStreet}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              
            </Row>

            <Row className="mb-3">
             
            </Row>

           

            <Button variant="primary" type="submit">
              Submit changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
