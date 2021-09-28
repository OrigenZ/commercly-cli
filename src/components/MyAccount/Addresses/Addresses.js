// ¿ User data con addresses?
// import { useContext } from "react"
// import { AuthContext } from "../../../context/auth.context"

function Addresses() {
  // ¿ User addresses = {user.address}?
  //const { user, logOutUser } = useContext(AuthContext)
  return (
    <div className="section">
      <section id="customer-addresses" class="container">
        <div class="dashboard-wrapper d-flex justify-content-center text-muted ">
          <div class="col-12 col-md-10 col-lg-8 ">
            <p class="">
              The following addresses will be used on the checkout page by
              default.
            </p>
            <div class="addresses row d-flex justify-content-between">
              <div class="billing-address col-sm-12 col-md-5">
                <div class="address-title">
                  <h3>Billing address</h3>
                  {/*  // Si Billing //
                  <a href="/customer/edit-address/billing/" class="add">
                    Edit
                  </a>
                  // Si NO Billing //
                  <a href="/customer/create-address/billing/" class="add">
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

              <div class="shipping-address col-sm-12 col-md-5 ">
                 <div class="address-title">
                  <h3>Shipping address</h3>
                  {/*// Si Shipping //
                  <a href="/customer/edit-address/shipping/" class="add">
                    Edit
                  </a>
                  // Si NO Shipping //
                  <a href="/customer/create-address/shipping/" class="add">
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
