import { useContext } from 'react'
import { AuthContext } from '../../../../common/context/Auth.context'
import { NavLink } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './NavMyAccount.css'

const NavMyAccount = () => {
  const { logOutUser } = useContext(AuthContext)
  return (
    <div id="subnav" className="border-bottom customer-menu px-3 text-muted">
      <Container as={Row}>
        <Col xs={12} sm={4} lg={2} className="center">
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
            to="/my-account/customer/orders"
            className="text-reset text-decoration-none text-uppercase"
          >
            Orders
          </NavLink>
        </Col>
        <Col xs={12} sm={4} lg={2} className="center">
          <NavLink
            exact
            activeClassName="active"
            to="/my-account/customer/address-list"
            className="text-reset text-decoration-none text-uppercase"
          >
            Addresses
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
        <Col xs={12} sm={4} lg={2} className="center">
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
  )
}

export default NavMyAccount
