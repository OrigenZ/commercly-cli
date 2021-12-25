import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  return (
    <div className="align-items-center">
      <h6 className="text-uppercase fw-bold mb-4 text-center">Contact</h6>
      <div className="ps-md-5">
        <p>
          <FontAwesomeIcon icon={faHome} className="me-3" />
          C/ Libertad 5, 08470, Barcelona
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} className="me-3" />
          info@example.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} className="me-3" />+ 34 540 325 120
        </p>
        <p>
          <FontAwesomeIcon icon={faPrint} className="me-3" />+ 34 340 331 300
        </p>
      </div>
    </div>
  )
}

export default Contact
