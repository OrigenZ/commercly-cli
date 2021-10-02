import Brand from './Brand/Brand'

import PopupCartP from './Cart/PopupCart/PopupCartP'
import NavLinks from './NavLinks/NavLinks'

const Navbar = () => {
  return (
    <div>
      <header className="border-bottom">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Brand />
            <div className="d-flex justify-content-end" id="navbar-menu">
              <div className="navbar-nav">
                <NavLinks />
                <PopupCartP />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
