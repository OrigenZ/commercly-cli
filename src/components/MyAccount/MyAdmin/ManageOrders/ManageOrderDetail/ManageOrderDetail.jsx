import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container } from 'react-bootstrap'
import Swal from 'sweetalert2/src/sweetalert2'
import dateFormat from 'dateformat'

import axiosInstance from '../../../../../common/http'

import './ManageOrderDetail.css'

const ManageOrderDetail = () => {
  const [order, setOrder] = useState({})
  const [address, setAddress] = useState({})

  const { orderId, customerId } = useParams()
  const storedToken = localStorage.getItem('authToken')

  const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateFormat(dateObj, 'mmm d, yyyy')
  }

  const getDetails = async () => {
    try {
      const responseOrder = await axiosInstance.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      const ord = responseOrder.data
      ord.createdAt = formatDate(ord.createdAt)
      setOrder(ord)

      const responseAddresses = await axiosInstance.get(
        `/api/users/${customerId}/addresses`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
      )
      setAddress(responseAddresses.data)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }

  useEffect(() => {
    getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      id="manage-order-details"
    >
      <h3 className="text-center text-muted text-uppercase">Order details</h3>
      <Col sm={12} md={9} lg={7} xl={6} id="manage-order-details-wrapper">
        <div className="d-flex justify-content-between">
          <div className="me-3">
            <span className="text-muted heading">Order ref.</span>
            <br />
            <span>{order._id}</span>
          </div>
          <div xs={3} md={2}>
            <span className="text-muted heading">Date</span>
            <br />
            <span>{order?.createdAt}</span>
          </div>
        </div>
        <h5 className="text-uppercase theme-color">Shipping address</h5>
        <div className="mb-3">
          <hr />
        </div>
        <div className="address">
          <p className="fw-bold">
            {address.shipping?.firstName} {address.shipping?.lastName}
          </p>
          <p>{address.shipping?.street}</p>
          <p>{address.shipping?.province}</p>
          <p>{address.shipping?.zip}</p>
          <p>{address.shipping?.city}</p>
          <p>{address.shipping?.country}</p>
          <p>{address.shipping?.phone}</p>
        </div>
        <h5 className="text-uppercase theme-color">Order details</h5>
        <div className="mb-3">
          <hr />
        </div>
        {order.orderLines?.map((orderLine) => (
          <div key={orderLine._id} className="d-flex justify-content-between">
            <span className="product-name">
              {orderLine.quantity} x {orderLine.productId.name}
            </span>
            <span className="product-totalLine">{orderLine.totalLine} €</span>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>{parseFloat(order.totalOrder?.toFixed(2))} €</span>
        </div>
        <div className="d-flex justify-content-between">
          <small>Shipping fee</small> <small>{order.shippingFees}€</small>
        </div>
        <div className="d-flex justify-content-between">
          <small>Tax</small>
          <small> {order.totalTaxes?.toFixed(2)}</small>
        </div>

        <div className="d-flex justify-content-between mt-3 total">
          <span className="text-muted">Total</span>
          <span className="theme-color">
            {(order.totalOrder + order.shippingFees).toFixed(2)} €
          </span>
        </div>
      </Col>
    </Container>
  )
}

export default ManageOrderDetail
