import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import { useContext } from "react";
import { AuthContext } from "../../common/context/Auth.context";

const UserCard = (props) => {
  const { user } = useContext(AuthContext);
  const { userData, handleDelete } = props;

  console.log('userData props', props)

  return (
    <>
      {user && user.isAdmin && (
        <Card id="card-users" className="col-sm-12 col-md-6 col-lg-3">
          <Link to={`/users/${userData._id}`}>
            <Card.Body className="prod-text">
              <Card.Title className="text-center">{userData.email}</Card.Title>
              <Card.Text>
                <span className="text-center text-muted">
                  {userData.createdAt}
                </span>
              </Card.Text>
              <Card.Text>
                <span className="text-center price">{userData._id}</span>
              </Card.Text>
              <Card.Text>
                <span className="text-center price">{userData.addresses.shipping.street}</span>
              </Card.Text>
            </Card.Body>
          </Link>

          <>
            <Link
              to={`/admin/user/edit/${userData._id}`} //TODO  pasar a App.js
              className="btn btn-outline-info edit-btn w-100 mb-2"
            >
              Edit
            </Link>

            <Button
              onClick={() => handleDelete(userData._id)}
              className="btn btn-outline-danger delete-btn w-100"
            >
              Delete
            </Button>
          </>
        </Card>
      )}
    </>
  );
};

export default UserCard;
