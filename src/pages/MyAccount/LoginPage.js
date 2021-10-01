import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { AuthContext } from "../../common/context/Auth.context";
import axiosInstance from "../../common/http/index";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axiosInstance
      .post(`/auth/login`, requestBody)
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        props.history.push("/"); // TODO: redirect to account-details (comun en todos los perfiles)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="section d-flex flex-column justify-content-center align-items-center ">
      <div className="col-sm-12 col-md-6 col-lg-4 text-muted">
        <h1>Login</h1>

        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Login{" "}
          </Button>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="mt-3">
          <p>
            Don't have an account yet? <Link to={"/signup"}> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
