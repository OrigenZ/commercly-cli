import { useState, useContext, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Offcanvas, Button, Modal } from 'react-bootstrap'

import { AuthContext } from '../../../../common/context/Auth.context'
import { CartContext } from '../../../../common/context/Cart.context'


import ShoppingCart from '../../../ShoppingCart/ShoppingCart'

import './CartDrawer.css'

const CartDrawer = () => {
  const { cart, count, setCount } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [show, setShow] = useState(false)


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const isShowCart = () => {
    if (typeof(user) !== 'undefined' && user != null) 
      return user.isAdmin

    return false
  }

  useEffect(() => {
    if (cart && cart.products) setCount(cart.products.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <>
      {isShowCart() === false && (
        <div className="nav-link" onClick={handleShow}>
          <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
          <span id="cart-count"> {count} </span>
        </div>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        id="popup-cart"
        placement={'end'}
        name={'end'}
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Offcanvas.Body>
          <ShoppingCart />
        </Offcanvas.Body>

        <Modal.Footer>
          <Button
            variant="success"
            href="/my-account/checkout"
            size="lg"
            className="w-100"
          >
            Checkout
          </Button>
        </Modal.Footer>
      </Offcanvas>
    </>
  )
}

export default CartDrawer
