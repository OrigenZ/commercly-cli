import { Link } from "react-router-dom"
import "./Forbidden.css"

const Forbidden = () => {
  return (
    <div id="forbidden" class="d-flex justify-content-center align-items-center">
      <div class="row">
        <div class="col-xs-12 text-center">
          <h1 className="text-muted">Forbidden</h1>
          <h4 class="text-xs-center text-muted">
            You do not have permission to access this resource
          </h4>
          <Link className="btn btn-outline-secondary py-3 px-5" to={'/'}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forbidden
