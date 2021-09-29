// ¿ User data con addresses?
// import { useContext } from "react"
// import { AuthContext } from "../../../common/context/auth.context"

function Addresses() {
  // ¿ User addresses = {user.address}?
  //const { user, logOutUser } = useContext(AuthContext)
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
                  {/*  // Si Billing //
                  <a href="/customer/edit-address/billing/" className="add">
                    Edit
                  </a>
                  // Si NO Billing //
                  <a href="/customer/create-address/billing/" className="add">
                    Add
                  </a>
                  //FIN // */}
                </div>
                {/* 
                <address>
                  // Si Billing // 
                  billing.firstName billing.lastName <br />
                  billing.street <br />
                  billing.zip billing.city <br />
                  billing.province <br />
                  billing.country 
                  // Si NO Billing // 
                  You have not set up this
                  type of address yet. 
                  //FIN //
                  <br />
                </address> */}
              </div>

              <div className="shipping-address col-sm-12 col-md-5 ">
                <div className="address-title">
                  <h3>Shipping address</h3>
                  {/*// Si Shipping //
                  <a href="/customer/edit-address/shipping/" className="add">
                    Edit
                  </a>
                  // Si NO Shipping //
                  <a href="/customer/create-address/shipping/" className="add">
                    Add
                  </a>
                  // FIN //*/}
                </div>
                {/* <address>
                  // Si Shipping // shipping.firstName shipping.lastName <br />
                  shipping.street <br />
                  shipping.zip shipping.city <br />
                  shipping.province <br />
                  shipping.country // Si NO Shipping // You have not set up this
                  type of address yet. // FIN //
                </address>  */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Addresses;
