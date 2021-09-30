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
import CartPage from './pages/CartPage/CartPage'
import ProductEdit from './components/Shop/ProductsListAdmin/ProductEdit'
import DashboardAdmin from './components/MyAccount/MyAdmin/Dashboard/DashboardAdmin'
import ManageProducts from './components/MyAccount/MyAdmin/ManageProducts/ManageProducts'
import ManageCategories from './components/MyAccount/MyAdmin/ManageCategories/ManageCategories'
import AccountDetailsAdmin from './components/MyAccount/MyAdmin/AccountDetails/AccountDetailsAdmin'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          exact
          path="/shop"
          component={ShopPage}
        />
        <Route
          exact
          path="/products/:id"
          component={ProductDetailPage}
        />
        <PrivateRoute
          exact
          path="/product/:id"
          component={ProductEdit}
        />
        <Route
          exact
          path="/about-us"
          render={(routeProps) => <AboutUsPage {...routeProps} />}
        />
        <AnonRoute
          exact
          path="/my-account"
          component={LoginPage}
        />
        <PrivateRoute
          exact
          path="/customer"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/customer/orders"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/customer/address-list"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/customer/account-details"
          component={MyAccountPage}
        />
        <PrivateRoute
          exact
          path="/cart"
          component={CartPage}
        />
         <PrivateRoute
            exact
            path="/admin/dashboard" //TODO: Change path a /admin
            component={ MyAccountPage }
          />
          <PrivateRoute
            exact
            path="/admin/products" //TODO: Change path a /products
            component={MyAccountPage}
          />
          <PrivateRoute
            exact
            path="/admin/categories" //TODO: Change path a /categories
            component={MyAccountPage}
          />
          <PrivateRoute
            exact
            path="/admin/account-details" //TODO: Change path a
            component={MyAccountPage}
          />


        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
