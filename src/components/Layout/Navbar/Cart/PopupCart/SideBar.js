import React, { useState } from "react";
import ShoppingCart from "../../../../ShoppingCart/ShoppingCart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import "./SideBar.css";

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
         <button className="cart" type="button" onClick={showSidebar}>
         <FontAwesomeIcon icon={faShoppingCart} className="me-3"/>
        </button>

      <div className={sidebar ? "sidebar active" : "sidebar"}>
         <button className="hamburger" type="button" onClick={showSidebar}>
         <div></div>
        </button>
        <ul onClick={showSidebar}>
            <li>Product</li>
            <li>Product</li>
            <li>Product</li>
            <li>Product</li>
            <li>Product</li>
        </ul>
      </div>
        </>
    );
  }
  
  export default Sidebar;