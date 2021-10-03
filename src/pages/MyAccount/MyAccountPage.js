import { useContext } from 'react'

import { AuthContext } from '../../common/context/Auth.context'
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import NavMyAccount from '../../components/MyAccount/CustomerAccount/NavMyAccount/NavMyAccount'
import Dashboard from '../../components/MyAccount/CustomerAccount/Dashboard/Dashboard'
import Orders from '../../components/MyAccount/CustomerAccount/Orders/Orders'
import Addresses from '../../components/MyAccount/CustomerAccount/Addresses/Addresses'
import AccountDetails from '../../components/MyAccount/AccountDetails/AccountDetails'
import NavMyAdmin from '../../components/MyAccount/MyAdmin/NavMyAdmin/NavMyAdmin'
import DashboardAdmin from '../../components/MyAccount/MyAdmin/Dashboard/DashboardAdmin'
import ManageCategories from '../../components/MyAccount/MyAdmin/ManageCategories/ManageCategories'
import ManageProducts from '../../components/MyAccount/MyAdmin/ManageProducts/ManageProducts'
import ManageUsers from '../../components/MyAccount/MyAdmin/ManageUsers/ManageUsers'
import NewProduct from '../../components/MyAccount/MyAdmin/ManageProducts/NewProduct/NewProduct'
import EditProduct from '../../components/MyAccount/MyAdmin/ManageProducts/EditProduct/EditProduct'
import EditCategory from '../../components/MyAccount/MyAdmin/ManageCategories/EditCategory/EditCategory'
import NewCategory from '../../components/MyAccount/MyAdmin/ManageCategories/NewCategory/NewCategory'
import EditUser from '../../components/MyAccount/MyAdmin/ManageUsers/EditUser/EditUser'

const MyAccountPage = () => {
  const { user } = useContext(AuthContext)
  if (!user.isAdmin) {
    return (
      <div className="section">
        <section id="user-dashboard" className="container">
          <NavMyAccount />
          <PrivateRoute exact path="/customer" component={Dashboard} />
          <PrivateRoute exact path="/customer/orders" component={Orders} />
          <PrivateRoute
            exact
            path="/customer/address-list"
            component={Addresses}
          />
          <PrivateRoute
            exact
            path="/account-details"
            component={AccountDetails}
          />
        </section>
      </div>
    )
  }
  return (
    <div className="section">
      <section id="user-dashboard" className="container">
        <NavMyAdmin />
        <PrivateRoute
          exact
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <PrivateRoute exact path="/admin/products" component={ManageProducts} />
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
          path="/admin/categories"
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
        <PrivateRoute exact path="/admin/users" component={ManageUsers} />
        <PrivateRoute
          exact
          path="/admin/user/edit/:id"
          component={EditUser}
        />
        <PrivateRoute
          exact
          path="/account-details"
          component={AccountDetails}
        />
      </section>
    </div>
  )
}

export default MyAccountPage
