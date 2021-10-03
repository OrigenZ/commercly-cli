import { useContext } from 'react'
import { AuthContext } from '../../../../common/context/Auth.context'
import { NavLink } from 'react-router-dom'
import './NavMyAdmin.css'

const NavMyAdmin = () => {
  const { logOutUser } = useContext(AuthContext)
  return (
    <div className="border-bottom customer-menu">
      <div className="row p-4">
        <div className="col-12 d-flex flex-row justify-content-center">
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/my-account/dashboard"
              className="text-reset text-decoration-none text-uppercase"
            >
              Dashboard
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/my-account/admin/products"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage products
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/my-account/admin/categories"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage categories
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/my-account/admin/users"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage users
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/my-account/account-details"
              className="text-reset text-decoration-none text-uppercase"
            >
              Account details
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              onClick={logOutUser}
              to="/"
              className="text-reset text-decoration-none text-uppercase"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavMyAdmin
