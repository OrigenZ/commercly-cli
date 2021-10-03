import { NavLink} from 'react-router-dom'
import './NavLinks.css'
import React, { useState } from 'react'
import { Navbar, Nav  } from 'react-bootstrap'


const NavLinks = () => {
  const [isLoggedIn] = useState(false)
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <NavLink exact activeClassName="active" to="/shop" className="nav-link">
        Shop
      </NavLink>
      <NavLink
        exact
        activeClassName="active"
        to="/about-us"
        className="nav-link"
      >
        About us
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          exact
          activeClassName="active"
          to="/my-account"
          className="nav-link"
        >
          My account
        </NavLink>
      ) : (
        <NavLink activeClassName="active" to="/customer" className="nav-link">
          My account
        </NavLink>
      )}
      </Nav>
    </Navbar.Collapse>
    </>
  )
}

export default NavLinks
