import { useContext } from "react";
import { AuthContext } from "../../../../common/context/Auth.context";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./NavMyAdmin.css";

const NavMyAdmin = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div id="subnav" className="border-bottom customer-menu px-3 text-muted">
      <Container className="subnav">
        <NavLink
          exact
          activeClassName="active"
          to="/my-account/dashboard"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Dashboard
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/admin/products"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Products
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/admin/categories"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Categories
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/admin/users"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Users
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/admin/orders"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Orders
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          to="/my-account/account-details"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Account details
        </NavLink>

        <NavLink
          exact
          activeClassName="active"
          onClick={logOutUser}
          to="/"
          className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
        >
          Logout
        </NavLink>
      </Container>
    </div>
  );
};

export default NavMyAdmin;
