import { Routes, Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/Layout/NavBar/NavBar";
import Footer from "./components/Layout/Footer/Footer";

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
import Notfound from "./pages/Errors/NotFound/NotFound";


const App = () => {
  return (
    <>
      <NavBar />
      <main>
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
          <Route path="/my-account/customer/" element={<PrivateCustomerRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
            <Route path="address-list" element={<Addresses />} />
            <Route path="edit-address/:type" element={<EditAddress />} />
            <Route path="add-address/:type" element={<NewAddress />} />
            <Route path="account-details" element={<AccountDetails />} />
            <Route path="checkout" element={<CheckOutPage />} />
          </Route>

          {/* Private routes admin */}
          <Route path="/my-account/admin/" element={<PrivateAdminRoute />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="product/create" element={<NewProduct />} />
            <Route path="product/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="category/create" element={<NewCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="user/edit/:id" element={<UserDetails />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="order/:orderId/customer/:customerId" element={<ManageOrderDetail />} />
            <Route path="account-details" element={<AccountDetails />} />
          </Route>

          {/* Error routes */}
          <Route path="*" element={<Notfound />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
