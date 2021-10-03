import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

import { AuthContext } from "../../common/context/Auth.context";

import './UserCard.css'

const UserCard = (props) => {
  const { user } = useContext(AuthContext);
  const { userData, handleDelete } = props;

  return (
    <>
      {user && user.isAdmin && (
        <Card id="card-users">
          <Row>
            <Col xs={12} sm={3} lg={3}>
              <Card.Title>{userData.email}</Card.Title>
            </Col>
            <Col xs={12} sm={2} lg={2}>
              <Card.Text>
                <span className="text-center text-muted">
                  {userData.createdAt.slice(0, 10)}
                </span>
              </Card.Text>
            </Col>
            <Col xs={12} sm={4} lg={4}>
              <Card.Text>
                <span className="text-center price">{userData._id}</span>
              </Card.Text>
            </Col>

            <Col xs={12} sm={12} lg={3}>
              <Row>
                <Col xs={12} sm={12} lg={6}>
                  <Link
                    to={`/admin/user/edit/${user._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-secondary edit-btn w-100 mb-2"
                  >
                    Edit
                  </Link>
                </Col>{" "}
                <Col xs={12} sm={12} lg={6}>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(userData._id)}
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
