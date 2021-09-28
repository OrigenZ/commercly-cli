import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { NavLink } from "react-router-dom";
import "./NavMyAccount.css";

function NavMyAccount() {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div className="border-bottom customer-menu">
      <div className="row p-5">
        <div className="col-12 d-flex flex-row justify-content-center">
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/customer"
              className="text-reset text-decoration-none text-uppercase"
            >
              Dashboard
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/customer/orders"
              className="text-reset text-decoration-none text-uppercase"
            >
              Orders
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/customer/address-list"
              className="text-reset text-decoration-none text-uppercase"
            >
              Addresses
            </NavLink>
          </div>
          <div className="px-3 text-muted">
            <NavLink
              exact
              activeClassName="active"
              to="/customer/account-details"
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

export default NavMyAccount;
