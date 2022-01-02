import React, { useContext } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import Swal from 'sweetalert2/src/sweetalert2'

import { CartContext } from '../../common/context/Cart.context'
import { AuthContext } from '../../common/context/Auth.context'
import axiosInstance from '../../common/http'

import './ShoppingCart.css'

const ShoppingCart = () => {
  const { checkOutDetails, cart, setCart } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken')

  const handleEditItem = async (id, operator) => {
    const param = operator === '+' ? 'add-item' : 'remove-item'
    const body = { productId: id, cartId: cart._id }

    try {
      const response = await axiosInstance.post(`/api/cart/${param}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setCart(response.data)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }

  return (
    <>
      <div>
        {isLoggedIn &&
          checkOutDetails.products?.map((line) => (
            <Row
              key={line.product._id}
              className="p-3 border-bottom popup-cart"
            >
              <Col xs={1} md={1} lg={1} className="p-0">
                <Button
                  className="quant"
                  variant="outline-dark"
                  onClick={() => handleEditItem(line.product._id, '+')}
                >
                  {' '}
                  +{' '}
                </Button>{' '}
                <Button
                  className="quant"
                  variant="outline-dark"
                  onClick={() => handleEditItem(line.product._id, '-')}
                >
                  {' '}
                  -{' '}
                </Button>
              </Col>
              <Col xs={1} md={1} lg={1} className="quantity">
                <h4>{line.quantity}</h4>
              </Col>
              <Col xs={6} md={6} lg={6} className="product-cart p-0">
                <h5>{line.product.name}</h5>
              </Col>
              <Col xs={4} md={4} lg={4} className="total-line">
                <h5>{line.totalLine}€</h5>
              </Col>
            </Row>
          ))}
      </div>
      <div>
        <Row className="total-price">
          Total: <h3>{checkOutDetails?.totalPrice || 0} €</h3>
        </Row>
      </div>
    </>
  )
}

export default ShoppingCart
