import commercly from '../../../../images/logo.png'
import { NavLink } from 'react-router-dom'

const Brand = () => {
  return (
    <NavLink activeclassname="active" to="/" className="navbar-brand">
      <img
        src={commercly}
        alt="logo"
        width="40"
        height="40"
        className="d-inline-block"
      />
      <span className="site-header-title text-muted fw-bold align-text-top">
        Commercly
      </span>
    </NavLink>
  )
}
export default Brand
