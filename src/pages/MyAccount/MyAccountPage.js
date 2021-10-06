import { useContext } from "react";

import { AuthContext } from "../../common/context/Auth.context";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import NavMyAccount from "../../components/MyAccount/CustomerAccount/NavMyAccount/NavMyAccount";
import Dashboard from "../../components/MyAccount/CustomerAccount/Dashboard/Dashboard";
import Orders from "../../components/MyAccount/CustomerAccount/Orders/Orders";
import Addresses from "../../components/MyAccount/CustomerAccount/Addresses/Addresses";
import AccountDetails from "../../components/MyAccount/AccountDetails/AccountDetails";
import NavMyAdmin from "../../components/MyAccount/MyAdmin/NavMyAdmin/NavMyAdmin";
import DashboardAdmin from "../../components/MyAccount/MyAdmin/Dashboard/DashboardAdmin";
import ManageCategories from "../../components/MyAccount/MyAdmin/ManageCategories/ManageCategories";
import ManageProducts from "../../components/MyAccount/MyAdmin/ManageProducts/ManageProducts";
import ManageUsers from "../../components/MyAccount/MyAdmin/ManageUsers/ManageUsers";
import NewProduct from "../../components/MyAccount/MyAdmin/ManageProducts/NewProduct/NewProduct";
import EditProduct from "../../components/MyAccount/MyAdmin/ManageProducts/EditProduct/EditProduct";
import EditCategory from "../../components/MyAccount/MyAdmin/ManageCategories/EditCategory/EditCategory";
import NewCategory from "../../components/MyAccount/MyAdmin/ManageCategories/NewCategory/NewCategory";
import UserDetails from "../../components/MyAccount/MyAdmin/ManageUsers/UserDetails/UserDetails";
import NewAddress from "../../components/MyAccount/CustomerAccount/Addresses/NewAddress/NewAddress";
import EditAddress from "../../components/MyAccount/CustomerAccount/Addresses/EditAddress/EditAddress";
import OrderDetails from "../../components/MyAccount/CustomerAccount/Orders/OrderDetails/OrderDetails";
import ManageOrders from "../../components/MyAccount/MyAdmin/ManageOrders/ManageOrders";
import ManageOrderDetail from "../../components/MyAccount/MyAdmin/ManageOrders/ManageOrderDetail/ManageOrderDetail";

const MyAccountPage = () => {
  const { user } = useContext(AuthContext);
  if (!user.isAdmin) {
    return (
      <section id="user-dashboard">
        <NavMyAccount />
        
          <PrivateRoute
            exact
            path="/my-account/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path="/my-account/customer/orders"
            component={Orders}
          />
          <PrivateRoute
            exact
            path="/my-account/customer/orders/:orderId"
            component={OrderDetails}
          />
          <PrivateRoute
            exact
            path="/my-account/customer/address-list"
            component={Addresses}
          />

           <PrivateRoute
            exact
            path="/my-account/customer/edit-address/:type"
            component={EditAddress}
          /> 
          <PrivateRoute
            exact
            path="/my-account/customer/add-address/:type"
            component={NewAddress}
          />

          <PrivateRoute
            exact
            path="/my-account/account-details"
            component={AccountDetails}
          />
     
      </section>
    );
  }
  return (
    <section id="user-dashboard">
      <NavMyAdmin />
      <div className="container">
        <PrivateRoute
          exact
          path="/my-account/dashboard"
          component={DashboardAdmin}
        />
        <PrivateRoute
          exact
          path="/my-account/admin/products"
          component={ManageProducts}
        />
        <PrivateRoute
          exact
          path="/admin/product/edit/:id"
          component={EditProduct}
        />
        <PrivateRoute
          exact
          path="/admin/product/create"
          component={NewProduct}
        />
        <PrivateRoute
          exact
          path="/my-account/admin/categories"
          component={ManageCategories}
        />
        <PrivateRoute
          exact
          path="/admin/category/edit/:id"
          component={EditCategory}
        />
        <PrivateRoute
          exact
          path="/admin/category/create"
          component={NewCategory}
        />
        <PrivateRoute
          exact
          path="/my-account/admin/users"
          component={ManageUsers}
        />
        <PrivateRoute exact path="/admin/user/edit/:id" component={UserDetails} />
        <PrivateRoute
          exact
          path="/my-account/admin/orders"
          component={ManageOrders}
        />
        <PrivateRoute
          exact
          path="/my-account/admin/orders/:orderId"
          component={ManageOrderDetail}
        />
        <PrivateRoute
          exact
          path="/my-account/account-details"
          component={AccountDetails}
        />
      </div>
    </section>
  );
};

export default MyAccountPage;
