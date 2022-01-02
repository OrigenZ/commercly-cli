import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Form } from 'react-bootstrap'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2/src/sweetalert2'

import { AuthContext } from '../../common/context/Auth.context'
import { CartContext } from '../../common/context/Cart.context'

import StripeForm from './StripeForm/StripeForm'
import axiosInstance from '../../common/http/index'

import './CheckOutCart.css'
// import './StripeForm/Stripeform.css'

const PUBLIC_STRIPE_KEY =
  'pk_test_51KDUd4In8yo4u8x4JfZShJ7B5oK9bRWDVO5iAUAJrxAA8fHhiMZDeqjT3CxbVKMqUss7z9KgCBn8tRhY6HhKaw7m00E0xKWpUf'

const CheckOutCart = () => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [shippingFees, setShippingFees] = useState(4)
  const [stripePromise] = useState(() => loadStripe(PUBLIC_STRIPE_KEY))

  const { user } = useContext(AuthContext)
  const { checkOutDetails, cart, setCart, setCount } = useContext(CartContext)

  let navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken')

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })
    // Check and see if errors , and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }

  const findFormErrors = () => {
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)

    const {
      firstName,
      lastName,
      phone,
      email,
      street,
      city,
      zip,
      province,
      country,
    } = form
    const newErrors = {}

    // firstName errors
    if (!firstName || firstName === '')
      newErrors.firstName = 'This field cannot be blank.'
    else if (firstName.length < 2)
      newErrors.name = 'First name cannot be less than 2 characters long.'
    else if (firstName.length > 40)
      newErrors.firstName = 'First name cannot be more than 40 characters long.'

    // lastName errors
    if (!lastName || lastName === '')
      newErrors.lastName = 'This field cannot be blank.'
    else if (lastName.length < 2)
      newErrors.lastName = 'Last name cannot be less than 2 characters long.'
    else if (lastName.length > 40)
      newErrors.lastName = 'Last name cannot be more than 40 characters long.'

    // phone errors
    if (!phone || phone === '') newErrors.phone = 'This field cannot be blank.'
    else if (phone.length < 9)
      newErrors.phone = 'This field cannot be less than 9 characters long.'

    // email errors
    if (!email || email === '') newErrors.email = 'This field cannot be blank.'
    else if (!emailRegex.test(email))
      newErrors.email = 'Please provide a valid email address.'

    // street errors
    if (!street || street === '')
      newErrors.street = 'This field cannot be blank.'

    // city errors
    if (!city || city === '') newErrors.city = 'This field cannot be blank.'

    // zip errors
    if (!zip || zip === '') newErrors.zip = 'This field cannot be blank.'
    else if (zip.length < 4)
      newErrors.zip = 'Zip field cannot be less than 2 characters long.'

    // province errors
    if (!province || province === '')
      newErrors.province = 'This field cannot be blank.'
    else if (province.length < 2)
      newErrors.province = 'Province cannot be less than 2 characters long.'
    else if (province.length > 40)
      newErrors.province = 'Province cannot be more than 40 characters long.'

    // country errors
    if (!country || country === '')
      newErrors.country = 'This field cannot be blank.'
    else if (country.length < 2)
      newErrors.country = 'Country cannot be less than 2 characters long.'
    else if (country.length > 40)
      newErrors.country = 'Country cannot be more than 40 characters long.'

    return newErrors
  }

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
        text: 'Something went wrong editing your order',
        showConfirmButton: false,
      })
    }
  }

  const handleSubmit = async () => {
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const totalOrder = checkOutDetails.totalPrice + shippingFees
        const totalBasePrice = checkOutDetails.totalBasePrice

        const totalTaxes = totalOrder - totalBasePrice

        const customer = user._id
        const orderLines = checkOutDetails.products.map(
          ({ product, ...keepAttrs }) => keepAttrs,
        )

        const body = {
          ...form,
          customer,
          totalOrder,
          totalTaxes,
          orderLines,
          shippingFees,
        }

        const order = await axiosInstance.post('/api/orders', body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        await axiosInstance.patch(`/api/cart/clear/${cart._id}`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        //reset cart drawer
        setCart(null)
        setCount(0)

        await Swal.fire({
          icon: 'success',
          text: 'Thank you for shopping with us',
          showConfirmButton: false,
        })

        navigate('/my-account')

        return order
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong creating your order',
          showConfirmButton: false,
        })
      }
    }
  }

  useEffect(() => {
    const billingAddress = checkOutDetails?.billing

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
      })
    }
  }, [checkOutDetails])

  return (
    <section id="cart" className="container">
      <div className="card">
        <Row>
          <Col md={8} className="cart">
            <div className="shopping">
              <div className="title border-bottom">
                <Row>
                  <Col>
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </Col>
                </Row>
              </div>

              <Row>
                <Row className="items-list align-items-center">
                  {checkOutDetails.products?.map((line) => (
                    <Row key={line.product._id} className="p-3 popup-cart">
                      <Col xs={1} md={1} lg={1} className="p-0">
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
                      <Col xs={1} md={1} lg={1} className="quantity">
                        <h5 className="p-0">{line.quantity}</h5>
                      </Col>
                      <Col
                        xs={2}
                        md={1}
                        lg={1}
                        className="product-checkout p-0"
                      >
                        <img
                          src={line.product.imageUrl}
                          alt={line.product.name}
                        />
                      </Col>
                      <Col
                        xs={4}
                        md={6}
                        lg={6}
                        className="product-checkout  pl-4"
                      >
                        <h5>{line.product.name}</h5>
                      </Col>
                      <Col xs={4} md={4} lg={3} className="total-line">
                        <h5>{line.totalLine}€</h5>
                      </Col>
                    </Row>
                  ))}
                </Row>
              </Row>
            </div>
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
                  <b>Billing address</b>{' '}
                </h4>
              </Row>
              <Form onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />

                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('firstName', e.target.value)}
                      isInvalid={!!errors.firstName}
                      value={form.firstName || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('lastName', e.target.value)}
                      isInvalid={!!errors.lastName}
                      value={form.lastName || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12} className="mb-3">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('phone', e.target.value)}
                      isInvalid={!!errors.phone}
                      value={form.phone || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label>Company (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('company', e.target.value)}
                      isInvalid={!!errors.company}
                      value={form.company || ''}
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
                      onChange={(e) => setField('email', e.target.value)}
                      isInvalid={!!errors.email}
                      value={form.email || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Street address *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('street', e.target.value)}
                      isInvalid={!!errors.street}
                      value={form.street || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.street}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12} className="mb-3">
                    <Form.Label>Postcode / ZIP *</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setField('zip', e.target.value)}
                      isInvalid={!!errors.zip}
                      value={form.zip || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label>Town / City *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('city', e.target.value)}
                      isInvalid={!!errors.city}
                      value={form.city || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} lg={6} xs={12} className="mb-3">
                    <Form.Label>Province *</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('province', e.target.value)}
                      isInvalid={!!errors.province}
                      value={form.province || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.province}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} lg={6} xs={12}>
                    <Form.Label>Country / Region</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setField('country', e.target.value)}
                      isInvalid={!!errors.country}
                      value={form.country || ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
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
              <div className="summary-flex">
                <p>Total items:</p>
                <p>{checkOutDetails?.totalItems}</p>
              </div>

              <div className="summary-flex">
                <p>Subtotal:</p>
                <p>{checkOutDetails?.totalPrice} €</p>
              </div>
            </Row>
            <Form>
              <Form.Label>SHIPPING: </Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={shippingFees}
                onChange={(e) => setShippingFees(e.target.value)}
              >
                <option className="text-muted" value="4">
                  Standard Delivery - 4.00 &euro;
                </option>
                <option className="text-muted" value="8">
                  Next Day Delivery - 8.00 &euro;
                </option>
                <option className="text-muted" value="12">
                  Same Day Delivery - 12.00 &euro;
                </option>
              </Form.Control>
            </Form>
            <Row>
              <div className="total-flex">
                <p>TOTAL: </p>
                <p>
                  {parseFloat(checkOutDetails?.totalPrice) +
                    parseInt(shippingFees)}
                  &nbsp;&euro;
                </p>
              </div>
            </Row>
            <Row>
              <div className="payment">
                <h5>
                  <b>Payment details</b>
                </h5>
              </div>
              <hr />
              <Elements stripe={stripePromise}>
                <StripeForm
                  handleSubmit={handleSubmit}
                  checkoutDetails={checkOutDetails}
                  form={form}
                />
              </Elements>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default CheckOutCart
