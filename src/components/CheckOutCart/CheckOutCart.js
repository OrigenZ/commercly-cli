import React, { useContext, useState, useEffect } from "react";
import { Col, Button, Row, Form } from "react-bootstrap";
import { CartContext } from "../../common/context/Cart.context";
import Swal from "sweetalert2/src/sweetalert2";
import axiosInstance from "../../common/http/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../common/context/Auth.context";

import "./CheckOutCart.css";

const CheckOutCart = () => {
  const { user } = useContext(AuthContext);
  const { checkOutDetails, cart, setCart } = useContext(CartContext);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  console.log(checkOutDetails);

  const storedToken = localStorage.getItem("authToken");

  const setField = (field, value) => {
    console.log("form", field, value);
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors , and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    // const { sku, quantity, name, price, brand, category } = form
    const newErrors = {};

    // // sku errors
    // if (!sku || sku === '') newErrors.sku = 'This field cannot be blank.'

    // // name errors
    // if (!name || name === '') newErrors.name = 'This field cannot be blank.'
    // else if (name.length < 3)
    //   newErrors.name = 'Title cannot be less than 3 characters long.'
    // else if (name.length > 50)
    //   newErrors.name = 'Title cannot be more than 50 characters long.'

    // // quantity errors
    // if (!quantity || quantity < 0)
    //   newErrors.quantity = 'Quantity cannot be less than 0.'

    // // price errors
    // if (!price || price === '') newErrors.price = 'This field cannot be blank.'
    // else if (price < 0) newErrors.price = 'Price cannot be less than 0.'

    // // brand errors
    // if (!brand || brand === '') newErrors.brand = 'This field cannot be blank.'
    // else if (brand.length < 2)
    //   newErrors.brand = 'Title cannot be less than 2 characters long.'
    // else if (brand.length > 20)
    //   newErrors.brand = 'Brand cannot be more than 20 characters long.'

    // // category
    // if (!category || category === '')
    //   newErrors.category = 'This field cannot be blank!'

    return newErrors;
  };

  const handleEditItem = (id, operator) => {
    const param = operator === "+" ? "add-item" : "remove-item";
    const body = { productId: id, cartId: cart._id };
    axiosInstance
      .post(`/api/cart/${param}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCart(response.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const totalOrder = checkOutDetails.totalPrice;
      const customer = user._id;
      const orderLines = checkOutDetails.products.map(({product, ...keepAttrs}) => keepAttrs)

      const body = { ...form, customer, totalOrder, orderLines };
      axiosInstance
        .post("/api/orders", body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("Order created = ", response.data);
          // e.target.reset();
          Swal.fire({
            icon: "success",
            text: "Thanks you for shopping with us",
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  useEffect(() => {
    const billingAddress =
      checkOutDetails && checkOutDetails.billing
        ? checkOutDetails.billing
        : null;

    if (billingAddress) {
      setForm({
        firstName: billingAddress.firstName,
        lastName: billingAddress.lastName,
        phone: billingAddress.phone,
        company: billingAddress.company,
        email: billingAddress.email,
        street: billingAddress.street,
        city: billingAddress.city,
        zip: billingAddress.zip,
        province: billingAddress.province,
        country: billingAddress.country,
      });
    }
  }, [checkOutDetails]);

  return (
    <section id="cart" className="container">
      <div className="card">
        <Row>
          <Col md={8} className="cart">
            <div className="title border-bottom">
              <Row>
                <Col>
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </Col>
                <Col className="align-self-center text-right text-muted">
                  <p>
                    {" "}
                    total items: {checkOutDetails && checkOutDetails.totalItems}
                  </p>
                </Col>
              </Row>
            </div>

            <Row>
              <Row className="items-list align-items-center">
                {checkOutDetails &&
                  checkOutDetails.products.map((line) => (
                    <Row
                      key={`${line.product._id}${Math.random() * 1000}`}
                      className="p-3 border-bottom popup-cart"
                    >
                      <Col xs={2} md={1} lg={1} className="p-0">
                        <Button
                          variant="outline-dark"
                          onClick={() => handleEditItem(line.product._id, "+")}
                        >
                          {" "}
                          +{" "}
                        </Button>{" "}
                        <Button
                          variant="outline-dark"
                          onClick={() => handleEditItem(line.product._id, "-")}
                        >
                          {" "}
                          -{" "}
                        </Button>
                      </Col>
                      <Col xs={2} md={1} lg={1} className="quantity">
                        <h3>{line.quantity}</h3>
                      </Col>
                      <Col
                        xs={6}
                        md={8}
                        lg={8}
                        className="product-checkout p-0"
                      >
                        <h4>{line.product.name}</h4>
                      </Col>
                      <Col xs={2} md={2} lg={2} className="total-line">
                        <h3>{line.totalLine}€</h3>
                      </Col>
                    </Row>
                  ))}
              </Row>
            </Row>

            <div className="back-to-shop">
              <a href="/shop">
                <span className="text-muted">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
                  Back to shop
                </span>
              </a>
            </div>
            <div>
              <Row className="border-bottom  mt-5">
                <h4>
                  <b>Billing address</b>{" "}
                </h4>
              </Row>
              <Form onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("firstName", e.target.value)}
                      isInvalid={!!errors.firstName}
                      value={form.firstName || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("lastName", e.target.value)}
                      isInvalid={!!errors.lastName}
                      value={form.lastName || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("phone", e.target.value)}
                      isInvalid={!!errors.phone}
                      value={form.phone || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Company (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("company", e.target.value)}
                      isInvalid={!!errors.company}
                      value={form.company || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.company}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setField("email", e.target.value)}
                      isInvalid={!!errors.email}
                      value={form.email || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Street address *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("street", e.target.value)}
                      isInvalid={!!errors.street}
                      value={form.street || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.street}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Postcode / ZIP *</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setField("zip", e.target.value)}
                      isInvalid={!!errors.zip}
                      value={form.zip || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Town / City *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("city", e.target.value)}
                      isInvalid={!!errors.city}
                      value={form.city || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Province *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("province", e.target.value)}
                      isInvalid={!!errors.province}
                      value={form.province || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.province}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Country / Region</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField("country", e.target.value)}
                      isInvalid={!!errors.country}
                      value={form.country || ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button variant="outline-secondary" type="submit">
                  Checkout
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={4} className="summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <Row>
              <div>
                <p>Total items: </p>
                <p>{checkOutDetails && checkOutDetails.totalItems}</p>
              </div>

              <div>
                {" "}
                <p>Total: </p>
                <h3>{checkOutDetails && checkOutDetails.totalPrice}€</h3>
              </div>
            </Row>
            <Form>
              <Form.Label>SHIPPING: </Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setField("shipping", e.target.value)}
                isInvalid={!!errors.shipping}
              >
                <option className="text-muted">
                  Standard Delivery - 4.00 &euro;
                </option>
                <option className="text-muted">
                  Next Day Delivery - 8.00 &euro;
                </option>
              </Form.Control>
            </Form>
            <Row>
              <Col>TOTAL: </Col>
              <Col className="text-right"> 1500 &euro;</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CheckOutCart;

// <>
//   <Row>
//     <Col xs={12} md={6} lg={8}>
//       <h2>Billing Address</h2>
//     </Col>

//     <Col xs={12} md={6} lg={4} className="checkout-cart">
//       <h2>Shopping Cart</h2>
//       <div>
//         {checkOutDetails &&
//           checkOutDetails.products.map((line) => (
//             <Row
//               key={`${line.product._id}${Math.random() * 1000}`}
//               className="p-3 border-bottom popup-cart"
//             >
//               {/* <Col xs={2} md={1} lg={1} className="quantity">
//                 <h3>{line.product.imageUrl}</h3>
//               </Col> */}
//               <Col xs={2} md={1} lg={1} className="p-0">
//                 <Button
//                   variant="outline-dark"
//                   onClick={() => handleEditItem(line.product._id, "+")}
//                 >
//                   {" "}
//                   +{" "}
//                 </Button>{" "}
//                 <Button
//                   variant="outline-dark"
//                   onClick={() => handleEditItem(line.product._id, "-")}
//                 >
//                   {" "}
//                   -{" "}
//                 </Button>
//               </Col>
//               <Col xs={2} md={1} lg={1} className="quantity">
//                 <h3>{line.quantity}</h3>
//               </Col>
//               <Col xs={6} md={8} lg={8} className="product-checkout p-0">
//                 <h4>{line.product.name}</h4>
//               </Col>
//               <Col xs={2} md={2} lg={2} className="total-line">
//                 <h3>{line.totalLine}€</h3>
//               </Col>
//             </Row>
//             //TODO: for a better way to do this shit
//           ))}
//       </div>
//       <div>
//         <Row className="total-price">
//           <div className="checkout-total">
//             <p>Total: </p>
//             <h3>{checkOutDetails && checkOutDetails.totalPrice}€</h3>
//           </div>
//         </Row>
//       </div>
//     </Col>
//   </Row>
// </>
