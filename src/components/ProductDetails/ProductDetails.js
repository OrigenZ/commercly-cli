import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../common/context/Auth.context";
import { CartContext } from "../../common/context/Cart.context";
import axiosInstance from "../../common/http/index";
import Swal from "sweetalert2/src/sweetalert2";
import {
  Col,
  Container,
  Image,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import defaultImage from "../../images/img-default.jpg";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("");
  const [setErrorMessage] = useState(undefined);
  const { cart, setCart, setCount } = useContext(CartContext);

  const { id } = useParams();

  const storedToken = localStorage.getItem("authToken");

  const handleCartItem = () => {
    if (product && cart) {
      const body = { productId: product._id, cartId: cart._id };
      axiosInstance
        .post(`/api/cart/add-item`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCart(response.data);
          Swal.fire({
            icon: "success",
            text: "Product added to cart",
            showConfirmButton: false,
          });
        });
    }
  };

  useEffect(() => {
    if (cart) {
      setCount(cart.products.length);
    }
  });

  useEffect(() => {
    axiosInstance
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProduct(response.data);
        setCategory(response.data.category.name);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container id="product-details">
      <Row>
        <Col xs={12} md={6} xl={5} className="col image-container">
          <Image
            src={product.imageUrl || defaultImage}
            alt="Product Name"
            className="image-label"
          />
        </Col>
        <Col xs={12} md={6} xl={6} className="col display">
          <div>
            <button
              type="button"
              className="btn btn-dark btn-lg disabled category"
            >
              {category}
            </button>
            <p className="text-muted">{product.brand} </p>
            <h3 className="heading">{product.name}</h3>
            <p className="product-price">{product.totalPrice} €</p>
            <ReactQuill
              className="product-description"
              value={product.description || ""}
              readOnly={true}
              theme="bubble"
            />
          </div>
          <div>
            <p className="product-quantity">
              <span className="product-stock">
                {" "}
                {product.quantity >= 10 && `In stock`}{" "}
              </span>
              <span className="product-limited-stock">
                {" "}
                {product.quantity < 10 &&
                  `Only ${product.quantity} available`}{" "}
              </span>
            </p>
            {user && !user.isAdmin && (
              <Form onSubmit={(e) => e.preventDefault()}>
                <Button
                  variant="outline-success"
                  onClick={handleCartItem} //TODO: check this later
                  type="submit"
                  size="lg"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
                  Add to cart
                </Button>
                <input type="hidden" value={product.id} name="productId" />
              </Form>
            )}
            {!user && (
              <p>
                <Link
                  to={`/my-account`}
                  className="btn btn-outline-danger must-logged"
                >
                  Log in
                </Link>
                to shop
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
