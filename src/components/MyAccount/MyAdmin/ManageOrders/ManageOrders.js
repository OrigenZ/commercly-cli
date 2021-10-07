import React from 'react'
import { useContext, useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import { AuthContext } from '../../../../common/context/Auth.context'
import axiosInstance from '../../../../common/http'
import ReactPaginate from 'react-paginate'
import { Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './ManageOrders.css'

const ManageOrders = () => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)

  const storedToken = localStorage.getItem('authToken')

  const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateFormat(dateObj, ' mmm dd yyyy @ h:MM:ss TT')
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(Math.ceil(selectedPage * perPage))
  }

  const handleChangeStatus = (e, id) => {
    const status = e.target.value
    axiosInstance
      .patch(
        `/api/orders/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
      )
      .then(() => {})
      .catch((err) => console.log(err.message))
  }

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/api/orders`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      console.log('orders', response.data)
      const data = response.data
      const slice = data.slice(offset, offset + perPage)

      const postData = slice.map((order) => (
        <Row key={order._id} className="orders-list">
          <Col xs={12} sm={4} lg={3}>
            <h5>{order._id}</h5>
          </Col>
          <Col xs={12} sm={4} lg={3}>
            <p>{formatDate(order.createdAt)}</p>
          </Col>
          <Col xs={12} sm={8} lg={2}>
            <Form.Select
              onChange={(e) => handleChangeStatus(e, order._id)}
              defaultValue={order.status}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={8} lg={2}>
            <p>{order.customer.email}</p>
          </Col>
          <Col xs={12} sm={12} lg={2}>
            <Link
              to={`/my-account/admin/orders/${order._id}`}
              className="btn btn-outline-secondary edit-btn w-100"
            >
              Order details
            </Link>
          </Col>
        </Row>
      ))

      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  useEffect(() => {
    axiosInstance
      .get(`/api/orders/customer/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setOrders(response.data)
      })
      .catch((err) => console.log(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="manage-orders">
      <Row id="head-orders-list">
        <Col xs={12} sm={4} lg={3}>
          <p>ID</p>
        </Col>
        <Col xs={12} sm={4} lg={3}>
          <p>Create at</p>
        </Col>
        <Col xs={12} sm={8} lg={2}>
          <p>Status</p>
        </Col>
        <Col xs={12} sm={8} lg={2}>
          <p>User email</p>
        </Col>
        <Col xs={12} sm={12} lg={2}>
          <p>Action</p>
        </Col>
      </Row>

      {orders.length !== 0 && data}
      {!orders.length && <p>No orders found</p>}

      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default ManageOrders
