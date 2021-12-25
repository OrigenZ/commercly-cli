// ¿ User data con addresses?
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { AuthContext } from '../../../../common/context/Auth.context'
import axiosInstance from '../../../../common/http'

import './Addresses.css'

const Addresses = () => {
  const { user } = useContext(AuthContext)
  const [billingAddress, setBillingAddress] = useState(null)
  const [shippingAddress, setShippingAddress] = useState(null)

  const storedToken = localStorage.getItem('authToken')

  useEffect(() => {
    // /api/users/:id/addresses
    axiosInstance(`/api/users/${user._id}/addresses`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        setBillingAddress(response.data.billing)
        setShippingAddress(response.data.shipping)
      })
      .catch((err) => console.log(err.message))
    //TODO: Set proper error handling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="customer-addresses" className="container">
      <div className="dashboard-wrapper text-muted ">
        <h4 className="text-center ">
          The following addresses will be used on the checkout page by default.
        </h4>

        <div className="col-12 d-flex flex-row flex-wrap justify-content-between">
          <Card className="col-lg-6 col-xs-12 mr-1">
            <Card.Header className="text-center">
              <Card.Title>Shipping Address:</Card.Title>
            </Card.Header>
            <Card.Body>
              {shippingAddress ? (
                <>
                  <Card.Text>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </Card.Text>
                  <Card.Text> {shippingAddress.company} </Card.Text>
                  <Card.Text> {shippingAddress.email} </Card.Text>
                  <Card.Text> {shippingAddress.phone} </Card.Text>
                  <Card.Text> {shippingAddress.street} </Card.Text>
                  <Card.Text>
                    {shippingAddress.zip} {shippingAddress.city}
                  </Card.Text>
                  <Card.Text>
                    {shippingAddress.province} {shippingAddress.country}
                  </Card.Text>
                </>
              ) : (
                <p>You have not set up this type of address yet.</p>
              )}
              {shippingAddress ? (
                <Link
                  to={'/my-account/customer/edit-address/shipping'}
                  className="edit btn btn-outline-secondary w-100"
                >
                  Edit
                </Link>
              ) : (
                <Link
                  to={'/my-account/customer/add-address/shipping'}
                  className="add btn btn-outline-secondary w-100"
                >
                  Add
                </Link>
              )}
            </Card.Body>
          </Card>

          <Card className="col-lg-6 col-xs-12 ml-1">
            <Card.Header>
              <Card.Title className="text-center">Billing Address:</Card.Title>
            </Card.Header>
            <Card.Body>
              {billingAddress ? (
                <>
                  <Card.Text>
                    {billingAddress.firstName} {billingAddress.lastName}
                  </Card.Text>
                  <Card.Text> {billingAddress.company} </Card.Text>
                  <Card.Text> {billingAddress.email} </Card.Text>
                  <Card.Text> {billingAddress.phone} </Card.Text>
                  <Card.Text> {billingAddress.street} </Card.Text>
                  <Card.Text>
                    {billingAddress.zip}, {billingAddress.city}
                  </Card.Text>
                  <Card.Text>
                    {billingAddress.province}, {billingAddress.country}
                  </Card.Text>
                </>
              ) : (
                <p>You have not set up this type of address yet.</p>
              )}
              {billingAddress ? (
                <Link
                  to={'/my-account/customer/edit-address/billing'}
                  className="edit btn btn-outline-secondary w-100"
                >
                  Edit
                </Link>
              ) : (
                <Link
                  to={'/my-account/customer/add-address/billing'}
                  className="add btn btn-outline-secondary w-100"
                >
                  Add
                </Link>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Addresses
