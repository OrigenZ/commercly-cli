import { useContext, useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

import { AuthContext } from "../../../common/context/Auth.context";
import axiosInstance from "../../../common/http";

import './AccountDetails.css'

const AccountDetails = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState('')

  const storedToken = localStorage.getItem("authToken");



  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === rePassword) {
      const body = { name, surname, username, email, phone, password };
      axiosInstance
        .patch(`/api/users/${user._id}`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          // const errorDescription = error.response.data.message
          // setErrorMessage(errorDescription)
        });
    } else {
      console.log("passwords do not match");
    }
  };

  useEffect(() => {
    axiosInstance(`/api/users/${user._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        const foundUser = response.data;
        setName(foundUser.name || "");
        setSurname(foundUser.surname || "");
        setUsername(foundUser.username || "");
        setPhone(foundUser.phone || "");
        setEmail(foundUser.email || "");
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message
        // setErrorMessage(errorDescription)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="section account">
    <Col xs={12} md={6} xl={4} >

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
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit changes
            </Button>
     
          </Form>
        </Col>
</Container>
  );
};

export default AccountDetails;
