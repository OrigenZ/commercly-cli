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
import AccountDetails from './components/MyAccount/AccountDetails/AccountDetails'

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
          render={(routeProps) => <ShopPage {...routeProps} />}
        />
        <Route
          exact
          path="/products/:id"
          render={(routeProps) => <ProductDetailPage {...routeProps} />}
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
          component={AccountDetails}
        />
{/*         <PrivateRoute
          exact
          path="/cart"
          component={Cart}
        /> */}

        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
