import { useContext } from "react";
import { AuthContext } from "../../../../common/context/auth.context";
import { NavLink } from "react-router-dom";
import "./NavMyAdmin.css";

function NavMyAdmin() {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div className="border-bottom customer-menu">
      <div className="row p-5">
        <div className="col-12 d-flex flex-row justify-content-center">
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/admin/dashboard"
              className="text-reset text-decoration-none text-uppercase"
            >
              Dashboard
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/admin/products"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage products
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/admin/categories"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage categories
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/admin/users"
              className="text-reset text-decoration-none text-uppercase"
            >
              Manage users
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/account-details"
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
  );
}

export default NavMyAdmin;
