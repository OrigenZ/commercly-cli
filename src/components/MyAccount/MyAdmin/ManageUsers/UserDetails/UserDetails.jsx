import { ListGroup, Accordion, Form, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../../../common/http/index'

import './UserDetails.css'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const [user, setUser] = useState('')

  const storedToken = localStorage.getItem('authToken')
  const { id } = useParams()

  useEffect(() => {
    axiosInstance
      .get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="user-details">
      <div className="d-flex container justify-content-center align-items-center">
        <div className="col-sm-12 col-md-6">
          <h3 className="text-center text-muted text-uppercase">
            User Details
          </h3>
          <ListGroup>
            <ListGroup.Item>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Name:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={user.name} />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Surname:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={user.surname}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Username:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={user.username}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Phone:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={user.phone} />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={user.email} />
                </Col>
              </Form.Group>
            </ListGroup.Item>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Billing Address:</Accordion.Header>
                <Accordion.Body>
                  {user.addresses && user.addresses.billing && (
                    <>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          First name:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.firstName}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Last name:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.lastName}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Email:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.email}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Phone:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.phone}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Company:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.company}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Street:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.street}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          City:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.city}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Province:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.province}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Postcode:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.zip}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Country:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.billing.country}
                          />
                        </Col>
                      </Form.Group>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header> Shipping Address:</Accordion.Header>
                <Accordion.Body>
                  {user.addresses && user.addresses.shipping && (
                    <>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          First name:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.firstName}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Last name:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.lastName}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Email:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.email}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Phone:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.phone}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Company:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.company}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Street:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.street}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          City:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.city}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Province:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.province}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Postcode:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.zip}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="2">
                          Country:
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={user.addresses.shipping.country}
                          />
                        </Col>
                      </Form.Group>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ListGroup>
        </div>
      </div>
    </section>
  )
}

export default UserDetails
