import Brand from "./Brand/Brand";

import PopupCartP from "./Cart/PopupCart/PopupCartP";
import NavLinks from "./NavLinks/NavLinks";
import { Navbar, Nav, Container } from "react-bootstrap";

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

              <PopupCartP />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
