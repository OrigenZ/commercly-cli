import { Navbar, Nav, Container } from 'react-bootstrap'
import Brand from './Brand/Brand'
import Cart from './CartDrawer/CartDrawer'
import NavLinks from './NavLinks/NavLinks'
import { AuthContext } from '../../../common/context/Auth.context'
import './Navbar.css'
import { useContext } from 'react'

const NavBar = () => {
  const { user } = useContext(AuthContext)

  const isShowCart = () => {
    if (typeof user !== 'undefined' && user != null) return user.isAdmin

    return false
  }

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
              {isShowCart() === false && <Cart />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
