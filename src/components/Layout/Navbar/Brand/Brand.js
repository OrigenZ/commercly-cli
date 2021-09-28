import commercly from '../../../../images/logo.png'

function Brand(){
    return(
        <a href="/" class="navbar-brand">
              <img src={commercly} alt="logo" width="40" height="40" class="d-inline-block" />
              <span class="site-header-title text-muted fw-bold align-text-top">Commercly</span>
            </a>
    )
}
export default Brand