import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import React, { useState } from "react";

const NavLinks = () => {
  const [isLoggedIn] = useState(false);
  return (
    <>
      <NavLink
        activeclassname="active"
        to="/shop"
        className="nav-link"
      >
        Shop
      </NavLink>
      <NavLink
        activeclassname="active"
        to="/about-us"
        className="nav-link"
      >
        About us
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          activeclassname="active"
          to="/my-account"
          className="nav-link"
        >
          My account
        </NavLink>
      ) : (
        <>
          <NavLink
            activeclassname="active"
            to="/my-account"
            className="nav-link"
          >
            My account
          </NavLink>
        </>
      )}
    </>
  );
};

export default NavLinks;
