import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../../../common/http";

import { Row, Col } from "react-bootstrap";
import dateFormat from "dateformat";
import "./ManageOrderDetail.css";

import { AuthContext } from "../../../../../common/context/Auth.context";
import { CartContext } from "../../../../../common/context/Cart.context";

const ManageOrderDetail = (props) => {
  const { orderId } = props.match.params;
  const { checkOutDetails } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState({});
  const storedToken = localStorage.getItem("authToken");

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
  console.log('order', order);
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <section id="manage-order-details">
      <div className="order-details-wrapper ">
        <div className="order-body ">
          <div className="text-right">
            {" "}
            <i className="fa fa-close close" data-dismiss="order"></i>{" "}
          </div>
          <div className="px-4 py-5">
          <Row>
              <Col className="col-7">
                {" "}
                <span id="heading">Date</span>
                <br /> <span id="details">{order && order.createdAt}</span>{" "}
              </Col>
              <Col className="col-5 pull-right">
                {" "}
                <span id="heading">Order ref.</span>
                <br /> <span id="details">{order._id}</span>{" "}
              </Col>
              </Row>
              <h6 className="text-uppercase">Shipping address</h6>
            <h6 >
              {address.shipping && address.shipping.firstName}{" "}
              {address.shipping && address.shipping.lastName}
            </h6>

            <div>
              <p> {address.shipping && address.shipping.street}</p>
              <p> {address.shipping && address.shipping.province}</p>
              <p> {address.shipping && address.shipping.zip}</p>
              <p> {address.shipping && address.shipping.city}</p>
              <p> {address.shipping && address.shipping.country}</p>
              <p>{address.shipping && address.shipping.phone}</p>
              <p>{address.shipping && address.shipping.email}</p>
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
                  <span>
                    {orderLine.quantity} x {orderLine.productId.name}
                  </span>
                  <span>{orderLine.totalLine} €</span>
                </div>
              ))}
            <div className="d-flex justify-content-between">
              <span className="text-muted">
              Subtotal
              </span>
              <span className="text-muted">
                {order.totalOrder} €
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <small>Shipping fee</small> <small>{order.shippingFees}€</small>
            </div>
            <div className="d-flex justify-content-between">
              <small>Tax</small>
              <small> {order.totalTaxes}</small>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span className="font-weight-bold">Total</span>
              {parseFloat(order.totalOrder) + parseFloat(order.shippingFees)}
            </div>

            <div className="text-center mt-5">
              <button className="btn btn-primary">Track your order</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageOrderDetail;
