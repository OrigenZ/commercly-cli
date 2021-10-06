import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import axiosInstance from "../../../../../common/http";

import { AuthContext } from "../../../../../common/context/Auth.context";

import dateFormat from "dateformat";
import "./OrderDetails.css";

const OrderDetails = (props) => {
  const { orderId } = props.match.params;
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
  console.log(order);
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <section id="manage-order-details">
      <div className="order-details-wrapper  container">
        <div className="order-body ">
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
            <h6>
              {address.shipping && address.shipping.firstName}{" "}
              {address.shipping && address.shipping.lastName}
            </h6>

            <div>
              <p>{address.shipping && address.shipping.street}</p>
              <p>{address.shipping && address.shipping.province}</p>
              <p>{address.shipping && address.shipping.zip}</p>
              <p>{address.shipping && address.shipping.city}</p>
              <p>{address.shipping && address.shipping.country}</p>
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
              <span className="text-muted">Subtotal</span>
              <span className="text-muted">{parseFloat(order.totalOrder) - parseFloat(order.shippingFees)}€</span>
            </div>
            <div className="d-flex justify-content-between">
              <small>Shipping fee</small> <small>{order.shippingFees}€</small>
            </div>
            <div className="d-flex justify-content-between">
              <small>Tax</small>
              <small> {order.totalTaxes && order.totalTaxes.toFixed(2)}</small>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span className="font-weight-bold">Total</span>
              <span className="font-weight-bold theme-color">
                {order.totalOrder}
              </span>
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

export default OrderDetails;

// <section id="order-details">
//   <div className="card">
//     <div className="title">Purchase Reciept</div>
//     <div className="info">
//       <Row>
//         <Col className="col-7">
//           {" "}
//           <span id="heading">Date</span>
//           <br /> <span id="details">{order.createdAt}</span>{" "}
//         </Col>
//         <Col className="col-5 pull-right">
//           {" "}
//           <span id="heading">Order ref.</span>
//           <br /> <span id="details">{order._id}</span>{" "}
//         </Col>
//       </Row>
//     </div>
//     <div className="pricing">
//       {order.orderLines &&
//         order.orderLines.map((orderLine) => (
//           <Row key={orderLine._id}>
//             <Col xs={12} sm={6} lg={9}>
//               {" "}
//               <span id="name">{orderLine.productId.name}</span>{" "}
//             </Col>
//             <Col xs={12} sm={6} lg={3}>
//               {" "}
//               <span id="price">{orderLine.totalLine} €</span>{" "}
//             </Col>
//           </Row>
//         ))}

//     </div>
//     <div className="shipping">
//       <Row>
//         <Col xs={12} sm={6} lg={3}>
//           Shipping
//         </Col>
//         <Col xs={12} sm={6} lg={6}></Col>
//         <Col xs={12} sm={6} lg={3}>
//           <big>40€</big>
//         </Col>
//       </Row>
//     </div>
//     <div className="total">
//       <Row>
//         <Col xs={12} sm={6} lg={3}>
//           <big>Total</big>
//         </Col>
//         <Col xs={12} sm={6} lg={6}></Col>
//         <Col xs={12} sm={6} lg={3}>
//           <big>{order.totalOrder} €</big>
//         </Col>
//       </Row>
//     </div>
//     <div className="progress-track">
//       <div className="title">Status: Processing</div>
//     </div>

//     <div className="footer">
//       <Row>
//         <Col xs={12} sm={6} lg={2}>
//           <img
//             className="img-fluid"
//             src="https://i.imgur.com/YBWc55P.png"
//             alt=""
//           />
//         </Col>
//         <Col xs={12} sm={6} lg={10}>
//           Thank you for shopping with us
//         </Col>
//       </Row>
//     </div>
//   </div>
// </section>
