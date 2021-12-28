import { useContext } from "react";
import { AuthContext } from "../../../../common/context/Auth.context";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./NavMyAdmin.css";

const NavMyAdmin = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div id="subnav" className="border-bottom px-3 text-muted">
      <Container>
        <NavLink
          activeclassname="active"
          to="/my-account/admin/dashboard"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Dashboard
        </NavLink>

        <NavLink
          activeclassname="active"
          to="/my-account/admin/products"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Products
        </NavLink>

        <NavLink
          activeclassname="active"
          to="/my-account/admin/categories"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Categories
        </NavLink>

        <NavLink
          activeclassname="active"
          to="/my-account/admin/users"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Users
        </NavLink>

        <NavLink
          activeclassname="active"
          to="/my-account/admin/orders"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Orders
        </NavLink>

        <NavLink
          activeclassname="active"
          to="/my-account/admin/account-details"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Account details
        </NavLink>

        <NavLink
          activeclassname="active"
          onClick={logOutUser}
          to="/"
          className="text-reset text-decoration-none text-uppercase button-nav-myadmin"
        >
          Logout
        </NavLink>
      </Container>
    </div>
  );
};

export default NavMyAdmin;
