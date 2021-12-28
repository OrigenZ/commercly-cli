import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import axiosInstance from "../../../../../common/http";

import { AuthContext } from "../../../../../common/context/Auth.context";

import dateFormat from "dateformat";
import "./OrderDetails.css";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState({});

  const storedToken = localStorage.getItem("authToken");
  const { orderId } = useParams()

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateFormat(dateObj, "mmm d, yyyy");
  };

  const getDetails = async () => {
    try {
      const responseOrder = await axiosInstance.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const ord = responseOrder.data;
      ord.createdAt = formatDate(ord.createdAt);
      setOrder(ord);

      const responseAddresses = await axiosInstance.get(
        `/api/users/${user._id}/addresses`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setAddress(responseAddresses.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="container d-flex flex-column justify-content-center col-lg-6 col-xs-12"
      id="user-order-details"
    >
      <div className="edit-product-wrapper">
        <h3 className="text-center text-muted text-uppercase">Order details</h3>

        <div className="edit-product-container">
          <Row>
            <Col className="col-8">
              {" "}
              <span id="heading">Order ref.</span>
              <br /> <span id="details">{order._id}</span>{" "}
            </Col>
            <Col className="col-4 pull-right">
              {" "}
              <span id="heading">Date</span>
              <br /> <span id="details">{order && order.createdAt}</span>{" "}
            </Col>
          </Row>
          <h5 className="text-uppercase">Shipping address</h5>
          <h5>
            {address.shipping && address.shipping.firstName}{" "}
            {address.shipping && address.shipping.lastName}
          </h5>

          <div className="address">
            <p>{address.shipping && address.shipping.street}</p>
            <p>{address.shipping && address.shipping.province}</p>
            <p>{address.shipping && address.shipping.zip}</p>
            <p>{address.shipping && address.shipping.city}</p>
            <p>{address.shipping && address.shipping.country}</p>
            <p>{address.shipping && address.shipping.phone}</p>

          </div>
          <span className="theme-color">Order details</span>
          <div className="mb-3">
            <hr className="new1" />
          </div>
          {order.orderLines &&
            order.orderLines.map((orderLine) => (
              <div
                key={orderLine._id}
                className="d-flex justify-content-between"
              >
                <span className="product-name">
                  {orderLine.quantity} x {orderLine.productId.name}
                </span>
                <span className="product-totalLine">{orderLine.totalLine} €</span>
              </div>
            ))}
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{(order.totalOrder - order.shippingFees).toFixed(2)} €</span>
          </div>
          <div className="d-flex justify-content-between">
            <small>Shipping fee</small> <small>{order.shippingFees} €</small>
          </div>
          <div className="d-flex justify-content-between text-muted">
            <small>Tax</small>
            <small> {order.totalTaxes && order.totalTaxes.toFixed(2)} €</small>
          </div>

          <div className="d-flex justify-content-between mt-3  total">
            <span>Total</span>
            <span className="theme-color">
              {order.totalOrder && (order.totalOrder).toFixed(2)} €
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default OrderDetails;

