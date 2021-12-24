import { Link } from 'react-router-dom'
import './NotFound.css'

const Notfound = () => {
  return (
    <div id="not-found" class="d-flex justify-content-center align-items-center">
      <div class="row">
        <div class="col-xs-12 text-center">
          <h1 className="text-muted">Ooops!</h1>
          <h4 class="text-xs-center text-muted">
            We could not find what you were looking for.
          </h4>
          <Link className="btn btn-outline-secondary py-3 px-5" to={'/'}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Notfound
