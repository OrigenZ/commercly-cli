import Brand from './Brand/Brand'
import Cart from './Cart/Cart'

import PopupCartH from './Cart/PopupCart/PopupCartH'
import PopupCartP from './Cart/PopupCart/PopupCartP'
import Sidebar from './Cart/PopupCart/SideBar'
import NavLinks from './NavLinks/NavLinks'

function Navbar(){
  return(
    <div>
      <header className="border-bottom">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Brand />
            <div className="d-flex justify-content-end" id="navbar-menu">
              <div className="navbar-nav">
                <NavLinks />
                <Cart />
                <PopupCartP />
                <PopupCartH />
                <Sidebar />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar