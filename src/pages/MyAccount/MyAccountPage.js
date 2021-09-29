import { Switch } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../common/context/auth.context";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import NavMyAccount from "../../components/MyAccount/CustomerAccount/NavMyAccount/NavMyAccount";
import Dashboard from "../../components/MyAccount/CustomerAccount/Dashboard/Dashboard";
import Orders from "../../components/MyAccount/CustomerAccount/Orders/Orders";
import Addresses from "../../components/MyAccount/CustomerAccount/Addresses/Addresses";
import AccountDetails from "../../components/MyAccount/CustomerAccount/AccountDetails/AccountDetails";
import NavMyAdmin from "../../components/MyAccount/MyAdmin/NavMyAdmin/NavMyAdmin";
import DashboardAdmin from "../../components/MyAccount/MyAdmin/Dashboard/DashboardAdmin";
import ManageCategories from "../../components/MyAccount/MyAdmin/ManageCategories/ManageCategories";
import ManageProducts from "../../components/MyAccount/MyAdmin/ManageProducts/ManageProducts";
import AccountDetailsAdmin from "../../components/MyAccount/MyAdmin/AccountDetails/AccountDetails";

function MyAccountPage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user.isAdmin) {
    return (
      <div className="section">
        <section id="user-dashboard" className="container">
          <NavMyAccount />
          <Switch>
            <PrivateRoute exact path="/customer" component={Dashboard} />
            <PrivateRoute exact path="/customer/orders" component={Orders} />
            <PrivateRoute
              exact
              path="/customer/address-list"
              component={Addresses}
            />
            <PrivateRoute
              exact
              path="/customer/account-details"
              component={AccountDetails}
            />
          </Switch>
        </section>
      </div>
    );
  }
  return (
    <div className="section">
      <section id="user-dashboard" className="container">
        <NavMyAdmin />
        <Switch>
          <PrivateRoute
            exact
            path="/customer" //TODO: Change path a /admin
            component={DashboardAdmin}
          />
          <PrivateRoute
            exact
            path="/customer/orders" //TODO: Change path a /products
            component={ManageProducts}
          />
          <PrivateRoute
            exact
            path="/customer/address-list" //TODO: Change path a /categories
            component={ManageCategories}
          />
          <PrivateRoute
            exact
            path="/customer/account-details" //TODO: Change path a
            component={AccountDetailsAdmin}
          />
        </Switch>
      </section>
    </div>
  );
}

export default MyAccountPage;
