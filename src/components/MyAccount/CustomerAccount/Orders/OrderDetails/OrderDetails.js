import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axiosInstance from "../../../../../common/http";
import dateFormat from "dateformat";

import "./OrderDetails.css";

const OrderDetails = (props) => {
  const { orderId } = props.match.params;
  const [order, setOrder] = useState({});
  const storedToken = localStorage.getItem("authToken");

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateFormat(dateObj, "mmm d, yyyy");
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        response.data.createdAt = formatDate(response.data.createdAt);
        setOrder(response.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  console.log("order", order);
  return (
    <section id="order-details">
      <div className="card">
        <div className="title">Purchase Reciept</div>
        <div className="info">
          <Row>
            <Col className="col-7">
              {" "}
              <span id="heading">Date</span>
              <br /> <span id="details">{order.createdAt}</span>{" "}
            </Col>
            <Col className="col-5 pull-right">
              {" "}
              <span id="heading">Order ref.</span>
              <br /> <span id="details">{order._id}</span>{" "}
            </Col>
          </Row>
        </div>
        <div className="pricing">
          {order.orderLines &&
            order.orderLines.map((orderLine) => (
              <Row key={orderLine._id}>
                <Col xs={12} sm={6} lg={9}>
                  {" "}
                  <span id="name">{orderLine.productId.name}</span>{" "}
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <span id="price">{orderLine.totalLine} €</span>{" "}
                </Col>
              </Row>
            ))}

        </div>
        <div className="shipping">
          <Row>
            <Col xs={12} sm={6} lg={3}>
              Shipping
            </Col>
            <Col xs={12} sm={6} lg={6}></Col>
            <Col xs={12} sm={6} lg={3}>
              <big>40€</big>
            </Col>
          </Row>
        </div>
        <div className="total">
          <Row>
            <Col xs={12} sm={6} lg={3}>
              <big>Total</big>
            </Col>
            <Col xs={12} sm={6} lg={6}></Col>
            <Col xs={12} sm={6} lg={3}>
              <big>{order.totalOrder} €</big>
            </Col>
          </Row>
        </div>
        <div className="progress-track">
          <div className="title">Status: Processing</div>
        </div>

        <div className="footer">
          <Row>
            <Col xs={12} sm={6} lg={2}>
              <img
                className="img-fluid"
                src="https://i.imgur.com/YBWc55P.png"
                alt=""
              />
            </Col>
            <Col xs={12} sm={6} lg={10}>
              Thank you for shopping with us
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
