import { Routes, Route } from "react-router-dom";

import "./App.css";

import AnonRoute from "./components/AnonRoute/AnonRoute";
import PrivateCustomerRoute from "./components/PrivateCustomerRoute/PrivateCustomerRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute/PrivateAdminRoute";

import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductDetailPage from "./pages/ShopPage/ProductDetailPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import SignupPage from "./pages/MyAccount/SignupPage";
import LoginPage from "./pages/MyAccount/LoginPage";

import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import ManageCategories from "./components/MyAccount/MyAdmin/ManageCategories/ManageCategories";
import ManageProducts from "./components/MyAccount/MyAdmin/ManageProducts/ManageProducts";
import ManageUsers from "./components/MyAccount/MyAdmin/ManageUsers/ManageUsers";
import NewProduct from "./components/MyAccount/MyAdmin/ManageProducts/NewProduct/NewProduct";
import EditProduct from "./components/MyAccount/MyAdmin/ManageProducts/EditProduct/EditProduct";
import EditCategory from "./components/MyAccount/MyAdmin/ManageCategories/EditCategory/EditCategory";
import NewCategory from "./components/MyAccount/MyAdmin/ManageCategories/NewCategory/NewCategory";
import UserDetails from "./components/MyAccount/MyAdmin/ManageUsers/UserDetails/UserDetails";
import NewAddress from "./components/MyAccount/CustomerAccount/Addresses/NewAddress/NewAddress";
import EditAddress from "./components/MyAccount/CustomerAccount/Addresses/EditAddress/EditAddress";
import OrderDetails from "./components/MyAccount/CustomerAccount/Orders/OrderDetails/OrderDetails";
import ManageOrders from "./components/MyAccount/MyAdmin/ManageOrders/ManageOrders";
import ManageOrderDetail from "./components/MyAccount/MyAdmin/ManageOrders/ManageOrderDetail/ManageOrderDetail";
import Dashboard from "./components/MyAccount/CustomerAccount/Dashboard/Dashboard";
import Orders from "./components/MyAccount/CustomerAccount/Orders/Orders";
import Addresses from "./components/MyAccount/CustomerAccount/Addresses/Addresses";
import AccountDetails from "./components/MyAccount/AccountDetails/AccountDetails";
import DashboardAdmin from "./components/MyAccount/MyAdmin/Dashboard/DashboardAdmin";


const App = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />

      {/* Anon routes */}
      <Route path="/my-account" element={<AnonRoute />}>
        <Route path="" element={<LoginPage />} />
      </Route>
      <Route path="/signup" element={<AnonRoute />}>
        <Route path="" element={<SignupPage />} />
      </Route>
      <Route path="/login" element={<AnonRoute />}>
        <Route path="" element={<LoginPage />} />
      </Route>

      {/* Private routes customer */}
      <Route path="/my-account/customer/dashboard" element={<PrivateCustomerRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/my-account/customer/orders" element={<PrivateCustomerRoute />}>
        <Route path="" element={<Orders />} />
      </Route>
      <Route path="/my-account/customer/orders/:orderId" element={<PrivateCustomerRoute />}>
        <Route path="" element={<OrderDetails />} />
      </Route>
      <Route path="/my-account/customer/address-list" element={<PrivateCustomerRoute />}>
        <Route path="" element={<Addresses />} />
      </Route>
      <Route path="/my-account/customer/edit-address/:type" element={<PrivateCustomerRoute />}>
        <Route path="" element={<EditAddress />} />
      </Route>
      <Route path="/my-account/customer/add-address/:type" element={<PrivateCustomerRoute />}>
        <Route path="" element={<NewAddress />} />
      </Route>
      <Route path="/my-account/customer/account-details" element={<PrivateCustomerRoute />}>
        <Route path="" element={<AccountDetails />} />
      </Route>
      <Route path="/my-account/customer/checkout" element={<PrivateCustomerRoute />}>
        <Route path="" element={<CheckOutPage />} />
      </Route>

      {/* Private routes admin */}
      <Route path="/my-account/admin/dashboard" element={<PrivateAdminRoute />}>
        <Route path="" element={<DashboardAdmin />} />
      </Route>
      <Route path="/my-account/admin/product/edit/:id" element={<PrivateAdminRoute />}>
        <Route path="" element={<EditProduct />} />
      </Route>
      <Route path="/my-account/admin/products" element={<PrivateAdminRoute />}>
        <Route path="" element={<ManageProducts />} />
      </Route>
      <Route path="/my-account/admin/product/create" element={<PrivateAdminRoute />}>
        <Route path="" element={<NewProduct />} />
      </Route>
      <Route path="/my-account/admin/categories" element={<PrivateAdminRoute />}>
        <Route path="" element={<ManageCategories />} />
      </Route>
      <Route path="/my-account/admin/category/edit/:id" element={<PrivateAdminRoute />}>
        <Route path="" element={<EditCategory />} />
      </Route>
      <Route path="/my-account/admin/category/create" element={<PrivateAdminRoute />}>
        <Route path="" element={<NewCategory />} />
      </Route>
      <Route path="/my-account/admin/users" element={<PrivateAdminRoute />}>
        <Route path="" element={<ManageUsers />} />
      </Route>
      <Route path="/my-account/admin/user/edit/:id" element={<PrivateAdminRoute />}>
        <Route path="" element={<UserDetails />} />
      </Route>
      <Route path="/my-account/admin/orders" element={<PrivateAdminRoute />}>
        <Route path="" element={<ManageOrders />} />
      </Route>
      <Route path="/my-account/admin/orders/:orderId" element={<PrivateAdminRoute />}>
        <Route path="" element={<ManageOrderDetail />} />
      </Route>
      <Route path="/my-account/admin/account-details" element={<PrivateAdminRoute />}>
        <Route path="" element={<AccountDetails />} />
      </Route>

      {/* Error routes */}
      <Route path="*" element={<h1>404 Not found</h1>} />

    </Routes>
  );
};

export default App;
