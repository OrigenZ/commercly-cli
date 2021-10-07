// ¿ User data con addresses?
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Accordion, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../../common/context/Auth.context";
import axiosInstance from "../../../../common/http";

import "./Addresses.css";

const Addresses = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  console.log(billingAddress, shippingAddress);

  useEffect(() => {
    // /api/users/:id/addresses
    axiosInstance(`/api/users/${user._id}/addresses`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        setBillingAddress(response.data.billing);
        setShippingAddress(response.data.shipping);
      })
      .catch((err) => console.log(err.message));
    //TODO: Set proper error handling
  }, []);

  return (
    <section id="customer-addresses">
      <div className="dashboard-wrapper d-flex justify-content-center text-muted ">
        <div className="col-12 col-md-10 col-lg-8 ">
          <p className="">
            The following addresses will be used on the checkout page by
            default.
          </p>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Billing Address:</Accordion.Header>
              <Accordion.Body>
                {billingAddress ? (
                  <ListGroup>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        First name:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.firstName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Last name:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.lastName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Email:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.email}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Phone:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.phone}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Company:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.company}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Street:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.street}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        City:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.city}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Province:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.province}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Postcode:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.zip}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Country:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={billingAddress.country}
                        />
                      </Col>
                    </Form.Group>
                  </ListGroup>
                ) : (
                  <p>You have not set up this type of address yet.</p>
                )}

                {billingAddress ? (
                  <Link
                    to={"/my-account/customer/edit-address/billing"}
                    className="edit btn btn-outline-secondary w-100"
                  >
                    Edit
                  </Link>
                ) : (
                  <Link
                    to={"/my-account/customer/add-address/billing"}
                    className="add  btn btn-outline-secondary w-100"
                  >
                    Add
                  </Link>
                )}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header> Shipping Address:</Accordion.Header>
              <Accordion.Body>
                {shippingAddress ? (
                  <ListGroup>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        First name:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.firstName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Last name:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.lastName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Email:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.email}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Phone:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.phone}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Company:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.company}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Street:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.street}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        City:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.city}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Province:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.province}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Postcode:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.zip}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="3">
                        Country:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={shippingAddress.country}
                        />
                      </Col>
                    </Form.Group>
                  </ListGroup>
                ) : (
                  <p>You have not set up this type of address yet.</p>
                )}

                {shippingAddress ? (
                  <Link
                    to={"/my-account/customer/edit-address/shipping"}
                    className="edit btn btn-outline-secondary w-100"
                  >
                    Edit
                  </Link>
                ) : (
                  <Link
                    to={"/my-account/customer/add-address/shipping"}
                    className="add btn btn-outline-secondary w-100"
                  >
                    Add
                  </Link>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Addresses;
