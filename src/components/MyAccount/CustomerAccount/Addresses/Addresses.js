// ¿ User data con addresses?
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../common/context/Auth.context";
import axiosInstance from "../../../../common/http";

const Addresses = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  console.log(billingAddress, shippingAddress);

  useEffect(() => {
    // /api/users/:id/addresses
    axiosInstance(`/api/users/${user._id}/addresses`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        setBillingAddress(response.data.billing);
        setShippingAddress(response.data.shipping);
      })
      .catch((err) => console.log(err.message));
    //TODO: Set proper error handling
  }, []);

  return (
    <div className="section">
      <section id="customer-addresses" className="container">
        <div className="dashboard-wrapper d-flex justify-content-center text-muted ">
          <div className="col-12 col-md-10 col-lg-8 ">
            <p className="">
              The following addresses will be used on the checkout page by
              default.
            </p>
            <div className="addresses row d-flex justify-content-between">
              <div className="billing-address col-sm-12 col-md-5">
                <div className="address-title">
                  <h3>Billing address</h3>

                  {billingAddress ? (
                    <address>
                      <p>First name: {billingAddress.firstName}</p>
                      <p>Last name: {billingAddress.lastName}</p>
                      <p>Email: {billingAddress.email}</p>
                      <p>Phone: {billingAddress.phone}</p>
                      <p>Company: {billingAddress.company}</p>
                      <p>Street: {billingAddress.street}</p>
                      <p>City: {billingAddress.city}</p>
                      <p>Province:{billingAddress.province}</p>
                      <p>Postcode: {billingAddress.zip}</p>
                      <p>Country: {billingAddress.country}</p>
                    </address>
                  ) : (
                    <p>You have not set up this type of address yet.</p>
                  )}

                  {billingAddress ? (
                    <Link to={"/my-account/customer/edit-address/billing"}className="edit" >
                      Edit
                    </Link>
                  ) : (
                    <Link to={"/my-account/customer/add-address/billing"} className="add" >
                      Add
                    </Link>
                  )}
                </div>

                <div className="shipping-address col-sm-12 col-md-5 ">
                  <div className="address-title">
                    <h3>Shipping address</h3>

                    {shippingAddress ? (
                      <address>
                        <p>First name: {shippingAddress.firstName}</p>
                        <p>Last name: {shippingAddress.lastName}</p>
                        <p>Email: {shippingAddress.email}</p>
                        <p>Phone: {shippingAddress.phone}</p>
                        <p>Company: {shippingAddress.company}</p>
                        <p>Street: {shippingAddress.street}</p>
                        <p>City: {shippingAddress.city}</p>
                        <p>Province:{shippingAddress.province}</p>
                        <p>Postcode: {shippingAddress.zip}</p>
                        <p>Country: {shippingAddress.country}</p>
                      </address>
                    ) : (
                      <p>You have not set up this type of address yet.</p>
                    )}

                    {shippingAddress ? (
                      <Link to={"/my-account/customer/edit-address/shipping"} className="edit" >
                        Edit
                      </Link>
                    ) : (
                      <Link to={"/my-account/customer/add-address/shipping"} className="add" >
                        Add
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addresses;
