import React from 'react'
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

import axiosInstance from '../../../../common/http'
import ReactPaginate from 'react-paginate'
import { Row, Col, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './ManageOrders.css'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'

const ManageOrders = () => {
  const [orders, setOrders] = useState([])
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)

  const storedToken = localStorage.getItem('authToken')

  const getOrders = async () => {
    try {
      const response = await axiosInstance.get(`/api/orders`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setOrders(response.data)
    } catch (err) {
      //TODO: set proper error handling
      console.log(err.message)
    }
  }

  const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateFormat(dateObj, ' mmm dd yyyy @ h:MM:ss TT')
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(Math.ceil(selectedPage * perPage))
  }

  const handleChangeStatus = async (status, id) => {
    try {
      await axiosInstance.patch(
        `/api/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${storedToken}` } },
      )
    } catch (err) {
      console.log(err.message)
      //TODO: set proper error handling
    }
  }

  const getData = () => {
    setPageCount(Math.ceil(orders.length / perPage))
    return orders.slice(offset, offset + perPage)
  }

  useEffect(() => {
    setData(getData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, orders])

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //TODO: create component appart
  return data.length ? (
    <Container>
      <Row id="manage-orders">
        <Col id="orders-list-admin">
          <Row id="head-orders-list">
            <Col xs={12} sm={4} lg={3}>
              <p>ID</p>
            </Col>
            <Col xs={12} sm={4} lg={2}>
              <p>Created at</p>
            </Col>
            <Col xs={12} sm={8} lg={2}>
              <p className="text-center">Status</p>
            </Col>
            <Col xs={12} sm={8} lg={3}>
              <p>User email</p>
            </Col>
            <Col xs={12} sm={12} lg={2} />
          </Row>
          <Col xs={12}>
            {data.map((order) => (
              <Row key={order._id} className="order-row">
                <Col xs={12} sm={4} lg={3}>
                  <p>{order._id}</p>
                </Col>
                <Col xs={12} sm={4} lg={2}>
                  <p>{formatDate(order.createdAt)}</p>
                </Col>
                <Col
                  xs={12}
                  sm={8}
                  lg={2}
                  className="d-flex justify-content-center"
                >
                  <Form.Select
                    onChange={(e) =>
                      handleChangeStatus(e.target.value, order._id)
                    }
                    defaultValue={order.status}
                    className="text-center"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Col>
                <Col xs={12} sm={8} lg={3}>
                  <p>{order.customer && order.customer.email}</p>
                </Col>
                <Col xs={12} sm={12} lg={2} className="actions-btn">
                  <Link
                    to={`/my-account/admin/order/${order._id}/customer/${order.customer._id}`}
                    className="btn btn-outline-secondary view-btn w-100"
                  >
                    Order details
                  </Link>
                </Col>
              </Row>
            ))}

            {!data.length && (
              <Col xs={12} className="text-center p-5">
                No orders found
              </Col>
            )}
          </Col>

          <Row className="pagination">
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
              activeclassname={'active'}
              renderOnZeroPageCount={null}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  )
}

export default ManageOrders
