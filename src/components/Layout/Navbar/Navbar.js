import Brand from './Brand/Brand'
import Cart from './Cart/Cart'
import NavLinks from './NavLinks/NavLinks'

function Navbar(){
  return(
    <div>
      <header class="border-bottom">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <Brand />
            <div class="d-flex justify-content-end" id="navbar-menu">
              <div class="navbar-nav">
                <NavLinks />
                <Cart />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar