import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import axiosInstance from "../../common/http/index";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password };
    //encriptar pass?

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state

    axiosInstance
      .post(`/auth/signup`, requestBody)
      .then((_) => props.history.push("/login")) // TODO: cambiar esto
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="section d-flex flex-column justify-content-center align-items-center ">
      <div className="col-sm-12 col-md-6 col-lg-4 text-muted">
        <h1>Sign Up</h1>

        <Form onSubmit={handleSignupSubmit}>
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
            Sign Up
          </Button>
        </Form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="mt-3">
          <p>
            Already have account?<Link to={"/login"}> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
