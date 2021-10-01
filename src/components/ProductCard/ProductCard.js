import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../common/context/auth.context";

const ProductCard = (props) => {
  const { user } = useContext(AuthContext);
  const { product, handleDelete, isShop } = props;

  return (
    <div>
      <Card id="card-products" className="col-sm-12 col-md-6 col-lg-3">
        <Link to={`/products/${product._id}`} className="row list">
          <div className="img-container">
            <Card.Img
              variant="top"
              src={product.imageUrl}
              className="w-100"
              alt={product.name}
            />
          </div>
          <Card.Body>
            <Card.Title className="text-center">{product.name}</Card.Title>
            <Card.Text>
              <p className="text-center">{product.brand}</p>
              <p className="text-center">{product.price} €</p>
            </Card.Text>
          </Card.Body>
        </Link>

        {user.isAdmin && !isShop && (
          <>
            <Link
              to={`/admin/product/edit/${product._id}`} //TODO  pasar a App.js
              className="btn btn-outline-info edit-btn w-100 mb-2"
            >
              Edit
            </Link>

            <Button
              onClick={() => handleDelete(product._id)}
              className="btn btn-outline-danger delete-btn w-100"
            >
              Delete
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
