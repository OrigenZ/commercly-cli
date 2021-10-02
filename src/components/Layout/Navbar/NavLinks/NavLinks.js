import { NavLink } from 'react-router-dom'
import './NavLinks.css'
import React, { useState } from 'react'

const NavLinks = () => {
  const [isLoggedIn] = useState(false)
  return (
    <>
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
    </>
  )
}

export default NavLinks
