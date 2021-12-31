import {
  faTwitter,
  faInstagram,
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Social = () => {
  return (
    <div className="align-items-center">
      <h6 className="text-uppercase fw-bold mb-4 text-center">Social</h6>
      <div className="d-flex social justify-content-around">
        <a href="#!" className="text-reset">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#!" className="text-reset">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#!" className="text-reset">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        <a href="#!" className="text-reset">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  )
}

export default Social
