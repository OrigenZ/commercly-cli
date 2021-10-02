import commercly from '../../../../images/logo.png'

function Brand(){
    return(
        <a href="/home" className="navbar-brand">
              <img src={commercly} alt="logo" width="40" height="40" className="d-inline-block" />
              <span className="site-header-title text-muted fw-bold align-text-top">Commercly</span>
            </a>
    )
}
export default Brand