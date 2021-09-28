import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

function Cart(){
    return(
        <a class="nav-link" href="/shop/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="me-3"/>
            <span id="cart-count"> {/*   {{defaultValue session.totalItemsCart '0'}} */}</span>
        </a>
    )
}

export default Cart