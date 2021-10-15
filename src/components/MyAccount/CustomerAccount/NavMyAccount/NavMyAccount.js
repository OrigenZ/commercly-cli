import { useContext } from "react";
import { AuthContext } from "../../../../common/context/Auth.context";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./NavMyAccount.css";

const NavMyAccount = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div id="subnav" className="border-bottom customer-menu px-3 text-muted">
      <Container className="subnav">
        <NavLink
          exact
          activeClassName="active"
          to="/my-account/dashboard"
          className="text-reset text-decoration-none text-uppercase button-navMyAccount"
        >
          Dashboard
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/customer/orders"
          className="text-reset text-decoration-none text-uppercase button-navMyAccount"
        >
          Orders
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/customer/address-list"
          className="text-reset text-decoration-none text-uppercase button-navMyAccount"
        >
          Addresses
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/account-details"
          className="text-reset text-decoration-none text-uppercase button-navMyAccount"
        >
          Account details
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          onClick={logOutUser}
          to="/"
          className="text-reset text-decoration-none text-uppercase button-navMyAccount"
        >
          Logout
        </NavLink>
      </Container>
    </div>
  );
};

export default NavMyAccount;
