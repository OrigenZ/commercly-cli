import { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { CartContext } from "../../../../../common/context/Cart.context";
import ShoppingCart from "../../../../ShoppingCart/ShoppingCart";

import "./PopupCartP.css";

function PopupCartC() {
  const [show, setShow] = useState(false);
  const { cart, count, setCount } = useContext(CartContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (cart && cart.products) setCount(cart.products.length);
    console.log('memory leak')
  },[cart, setCount]);

  return (
    <>
      <div className="nav-link" onClick={handleShow}>
        <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
        <span id="cart-count"> {count} </span>
      </div>
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
