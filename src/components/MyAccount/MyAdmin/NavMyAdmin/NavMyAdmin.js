import { useContext } from "react";
import { AuthContext } from "../../../../common/context/Auth.context";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./NavMyAdmin.css";

const NavMyAdmin = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div id="subnav" className="border-bottom customer-menu px-3 text-muted">
      <Container as={Row}>
        <Col xs={12} sm={4} lg={1} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/dashboard"
            className="text-reset text-decoration-none text-uppercase"
          >
            Dashboard
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/products"
            className="text-reset text-decoration-none text-uppercase"
          >
            Manage products
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/categories"
            className="text-reset text-decoration-none text-uppercase"
          >
            Manage categories
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/users"
            className="text-reset text-decoration-none text-uppercase"
          >
            Manage users
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/orders"
            className="text-reset text-decoration-none text-uppercase"
          >
            Manage orders
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/account-details"
            className="text-reset text-decoration-none text-uppercase"
          >
            Account details
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={1} className="center">
          <NavLink
            exact
            activeClassName="active"
            onClick={logOutUser}
            to="/"
            className="text-reset text-decoration-none text-uppercase"
          >
            Logout
          </NavLink>
        </Col>
      </Container>
    </div>
  );
};

export default NavMyAdmin;
