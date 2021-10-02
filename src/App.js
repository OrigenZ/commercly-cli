import { Switch, Route } from 'react-router-dom'

// import './App.css';

import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ProductDetailPage from './pages/ShopPage/ProductDetailPage'
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'
import SignupPage from './pages/MyAccount/SignupPage'
import LoginPage from './pages/MyAccount/LoginPage'
import AnonRoute from './components/AnonRoute/AnonRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import MyAccountPage from './pages/MyAccount/MyAccountPage'
import CheckOutPage from './pages/CheckOutPage/CheckOutPage'

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/products/:id" component={ProductDetailPage} />

        <Route exact path="/about-us" component={AboutUsPage} />
        <AnonRoute exact path="/my-account" component={LoginPage} />
        <PrivateRoute exact path="/customer" component={MyAccountPage} />
        <PrivateRoute exact path="/customer/orders" component={MyAccountPage} />
        <PrivateRoute
          exact
          path="/customer/address-list"
          component={MyAccountPage}
        />
        <PrivateRoute exact path="/account-details" component={MyAccountPage} />
        <PrivateRoute exact path="/cart" component={CheckOutPage} />
        <PrivateRoute exact path="/admin/dashboard" component={MyAccountPage} />
        <PrivateRoute exact path="/admin/products" component={MyAccountPage} />
        <PrivateRoute
          exact
          path="/admin/product/edit/:id"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/admin/product/create"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/admin/categories"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/admin/category/edit/:id"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/admin/category/create"
          component={MyAccountPage}
        />
        <PrivateRoute exact path="/admin/users" component={MyAccountPage} />

        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
