import { Navbar, Nav, Container } from 'react-bootstrap'
import Brand from './Brand/Brand'
import Cart from './CartDrawer/CartDrawer'
import NavLinks from './NavLinks/NavLinks'

import './Navbar.css'

const MyNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand>
            <Brand />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavLinks />
              <Cart />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNavbar
