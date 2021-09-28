import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import ShoppingCart from "../../../../ShoppingCart/ShoppingCart"
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

import './PopupCart.css'

function PopupCartP(){
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleShow = (event) => {
    setShow(!show)
    setTarget(event.target);
  };
  const handleHide = (event) => {
    setShow(!hide)
    setTarget(event.target);
  };
    return(

      <div ref={ref}>
        <a className="nav-link" href="/cart" onMouseOver={handleShow} onMouseOut={handleHide} >
            <FontAwesomeIcon icon={faShoppingCart} className="me-3"/>
            <span id="cart-count"> {/*   {{defaultValue session.totalItemsCart '0'}} */}</span>
        </a>

        <Overlay
        show={show}
        hide={hide}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Shopping cart</Popover.Header>
          <Popover.Body>
            <ShoppingCart />.
          </Popover.Body>
        </Popover>
      </Overlay>
  
      </div>
    )
}

export default PopupCartP