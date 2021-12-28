import React, { useContext, useState, useEffect } from "react";
import { useIsMount } from "../../common/customHooks/useIsMount";
import { AuthContext } from "../../common/context/Auth.context";
import axiosInstance from "../../common/http/index";
import dateFormat from "dateformat";

import * as reactRouterDom from "react-router-dom";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

import "./UserCard.css";

const UserCard = (props) => {
  const { user } = useContext(AuthContext);
  const { userData, handleDelete } = props;
  const [isAdmin, setIsAdmin] = useState(`${userData.isAdmin}`);

  const isMount = useIsMount();
  const storedToken = localStorage.getItem("authToken");

  const formatDate = () => {
    const dateObj = new Date(userData.createdAt);
    return dateFormat(dateObj, " mmm dd yyyy @ h:MM:ss TT");
  };

  const handleCheckbox = (e) => {
    const isTrue = e.target.value === "true";

    if (isTrue) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    if (!isMount) {
      axiosInstance
        .patch(
          `/api/users/${userData._id}`,
          { isAdmin: isAdmin },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then((response) => response)
        .catch((err) => console.log(err.message));
      //TODO: set proper error handling
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <>
      {user && user.isAdmin && (
        <Card id="card-users">
          <Row>
            <Col xs={12} sm={3} lg={3}>
              <Card.Text>
                <span className="text-center text-muted">{userData.email}</span>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} lg={2}>
              <Card.Text>
                <span className="text-center text-muted">{formatDate()}</span>
              </Card.Text>
            </Col>
            <Col xs={12} sm={4} lg={1}>
              <Form className="text-center price">
                <Form.Group className="before">
                  <Form.Check
                    type="checkbox"
                    defaultChecked={userData.isAdmin}
                    value={isAdmin}
                    onChange={handleCheckbox}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12} sm={4} lg={3}>
              <Card.Text>
                <span className="text-center price">{userData._id}</span>
              </Card.Text>
            </Col>

            <Col xs={12} sm={12} lg={3}>
              <Row className="btns">
                <Col xs={6} sm={6} lg={6}>
                  <reactRouterDom.Link
                    to={`/my-account/admin/user/edit/${userData._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-secondary edit-btn w-100 mb-2"
                  >
                    Details
                  </reactRouterDom.Link>
                </Col>{" "}
                <Col xs={6} sm={6} lg={6}>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      handleDelete(userData._id, userData.username)
                    }
                    className="w-100"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default UserCard;
