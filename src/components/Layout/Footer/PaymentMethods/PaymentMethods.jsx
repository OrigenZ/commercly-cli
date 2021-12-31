import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBitcoin,
  faCcVisa,
  faCcMastercard,
} from '@fortawesome/free-brands-svg-icons'

const PaymentMethods = () => {
  return (
    <div className="payment-methods">
      <span className="fab fa-bitcoin mx-4">
        <FontAwesomeIcon icon={faBitcoin} />
      </span>
      <span className="fab fa-cc-visa mx-4">
        <FontAwesomeIcon icon={faCcVisa} />
      </span>
      <span className="fab fa-cc-mastercard mx-4">
        <FontAwesomeIcon icon={faCcMastercard} />
      </span>
    </div>
  )
}

export default PaymentMethods
