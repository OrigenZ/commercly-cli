import { useState, useContext } from "react";
// import { AuthContext } from "../../../../../common/context/auth.context";
import { CartContext } from "../../../../../common/context/cart.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./PopupCartP.css";
import ShoppingCart from "../../../../ShoppingCart/ShoppingCart";

function PopupCartC() {
  const [show, setShow] = useState(false);
  const { count } = useContext(CartContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <a className="nav-link" href="#!" onClick={handleShow}>
        <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
        <span id="cart-count"> {count} </span>
      </a>
      <Modal id="popup-cart" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShoppingCart />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" href="/cart">
            Go to cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupCartC;
