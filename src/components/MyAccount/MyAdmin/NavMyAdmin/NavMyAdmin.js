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
        <Col className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/dashboard"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Dashboard
          </NavLink>
        </Col>
        <Col className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/products"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Products
          </NavLink>
        </Col>
        <Col className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/categories"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Categories
          </NavLink>
        </Col>
        <Col  className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/users"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Users
          </NavLink>
        </Col>
        <Col  className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/admin/orders"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          > 
            Orders
          </NavLink>
        </Col>
        <Col className="text-center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/account-details"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Account details
          </NavLink>
        </Col>
        <Col className="text-center">
          <NavLink
            exact
            activeClassName="active"
            onClick={logOutUser}
            to="/"
            className="text-reset text-decoration-none text-uppercase button-navMyAdmin"
          >
            Logout
          </NavLink>
        </Col>
      </Container>
    </div>
  );
};

export default NavMyAdmin;
