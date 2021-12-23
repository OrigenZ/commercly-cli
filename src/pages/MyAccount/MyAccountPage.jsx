import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
  return !user.isAdmin ?
    (
      <section id="user-dashboard">
        <NavMyAccount />
        <div className="container">
          <Routes>
            <Route path="/my-account/dashboard" element={<PrivateRoute />}>
              <Route path="" element={<Dashboard />} />
            </Route>
            <Route path="/my-account/customer/orders" element={<PrivateRoute />}>
              <Route path="" element={<Orders />} />
            </Route>
            <Route path="/my-account/customer/orders/:orderId" element={<PrivateRoute />}>
              <Route path="" element={<OrderDetails />} />
            </Route>
            <Route path="/my-account/customer/address-list" element={<PrivateRoute />}>
              <Route path="" element={<Addresses />} />
            </Route>
            <Route path="/my-account/customer/edit-address/:type" element={<PrivateRoute />}>
              <Route path="" element={<EditAddress />} />
            </Route>
            <Route path="/my-account/customer/add-address/:type" element={<PrivateRoute />}>
              <Route path="" element={<NewAddress />} />
            </Route>
            <Route path="/my-account/account-details" element={<PrivateRoute />}>
              <Route path="" element={<AccountDetails />} />
            </Route>
          </Routes>
        </div>
      </section>
    ) : (
      <section id="user-dashboard">
        <NavMyAdmin />
        <div className="container">
          <Routes>
            <Route path="/my-account/dashboard" element={<PrivateRoute />}>
              <Route path="" element={<DashboardAdmin />} />
            </Route>
            <Route path="/admin/product/edit/:id" element={<PrivateRoute />}>   {/* TODO: check naming consistency*/}
              <Route path="" element={<EditProduct />} />
            </Route>
            <Route path="/my-account/admin/products" element={<PrivateRoute />}>
              <Route path="" element={<ManageProducts />} />
            </Route>
            <Route path="/admin/product/create" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
              <Route path="" element={<NewProduct />} />
            </Route>
            <Route path="/my-account/admin/categories" element={<PrivateRoute />}>
              <Route path="" element={<ManageCategories />} />
            </Route>
            <Route path="/admin/category/edit/:id" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
              <Route path="" element={<EditCategory />} />
            </Route>
            <Route path="/admin/category/create" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
              <Route path="" element={<NewCategory />} />
            </Route>
            <Route path="/my-account/admin/users" element={<PrivateRoute />}>
              <Route path="" element={<ManageUsers />} />
            </Route>
            <Route path="/admin/user/edit/:id" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
              <Route path="" element={<UserDetails />} />
            </Route>
            <Route path="/my-account/admin/orders" element={<PrivateRoute />}>
              <Route path="" element={<ManageOrders />} />
            </Route>
            <Route path="/my-account/admin/orders/:orderId" element={<PrivateRoute />}>
              <Route path="" element={<ManageOrderDetail />} />
            </Route>
            <Route path="/my-account/account-details" element={<PrivateRoute />}>
              <Route path="" element={<AccountDetails />} />
            </Route>
          </Routes>
        </div>
      </section>
    );
}

export default MyAccountPage;
