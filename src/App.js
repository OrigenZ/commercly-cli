import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductDetailPage from "./pages/ShopPage/ProductDetailPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import SignupPage from "./pages/MyAccount/SignupPage";
import LoginPage from "./pages/MyAccount/LoginPage";
import AnonRoute from "./components/AnonRoute/AnonRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyAccountPage from "./pages/MyAccount/MyAccountPage";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";

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

      {/* Common private routes */}
      <Route path="/my-account/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>

      {/* Private routes customer */}
      <Route path="/my-account/customer/orders" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/customer/orders/:orderId" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/customer/edit-address/:type" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/customer/add-address/:type" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/customer/address-list" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/account-details" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/checkout" element={<PrivateRoute />}>
        <Route path="" element={<CheckOutPage />} />
      </Route>
      
      {/* Private routes admin */}
      <Route path="/my-account/admin/products" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/admin/product/edit/:id" element={<PrivateRoute />}>   {/* TODO: check naming consistency*/}
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/admin/product/create" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/admin/categories" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/admin/category/edit/:id" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/admin/category/create" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/admin/users" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/admin/user/edit/:id" element={<PrivateRoute />}>  {/* TODO: check naming consistency*/}
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/admin/orders" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>
      <Route path="/my-account/admin/orders/:orderId" element={<PrivateRoute />}>
        <Route path="" element={<MyAccountPage />} />
      </Route>

    </Routes>
  );
};

export default App;
