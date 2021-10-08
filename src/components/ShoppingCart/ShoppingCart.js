import React, { useContext } from 'react'
import { CartContext } from '../../common/context/Cart.context'
import { AuthContext } from '../../common/context/Auth.context'

import { Col, Button, Row } from 'react-bootstrap'
import axiosInstance from '../../common/http'

import './ShoppingCart.css'

const ShoppingCart = () => {
  const { checkOutDetails, cart, setCart } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken')

  const handleEditItem = (id, operator) => {
    const param = operator === '+' ? 'add-item' : 'remove-item'
    const body = { productId: id, cartId: cart._id }
    axiosInstance
      .post(`/api/cart/${param}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCart(response.data)
      })
  }


  return (
    <>
      <div>
        {checkOutDetails &&
          isLoggedIn &&
          checkOutDetails.products.map((line) => (
            <Row
              key={`${line.product._id}${Math.random() * 1000}`}
              className="p-3 border-bottom popup-cart"
            >
              <Col xs={2} md={1} lg={1} className="p-0">
                <Button
                  variant="outline-dark"
                  onClick={() => handleEditItem(line.product._id, '+')}
                >
                  {' '}
                  +{' '}
                </Button>{' '}
                <Button
                  variant="outline-dark"
                  onClick={() => handleEditItem(line.product._id, '-')}
                >
                  {' '}
                  -{' '}
                </Button>
              </Col>
              <Col xs={2} md={1} lg={1} className="quantity">
                <h3>{line.quantity}</h3>
              </Col>
              <Col xs={6} md={8} lg={8} className="product-cart p-0">
                <h4>{line.product.name}</h4>
              </Col>
              <Col xs={2} md={2} lg={2} className="total-line">
                <h3>{line.totalLine}€</h3>
              </Col>
            </Row>
            //TODO: for a better way to do this shit
          ))}
      </div>
      <div>
        <Row className="total-price">
          Total:{' '}
          <h3>{(checkOutDetails && checkOutDetails.totalPrice) || 0} €</h3>
        </Row>
      </div>
    </>
  )
}

export default ShoppingCart
