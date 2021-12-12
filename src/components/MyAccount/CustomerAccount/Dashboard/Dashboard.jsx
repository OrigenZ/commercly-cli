import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../common/context/Auth.context'

import './Dashboard.css'

const Dashboard = () => {
  const { user, logOutUser } = useContext(AuthContext)
  return (
    <div id="dashboard">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <p>
            Hello <strong>{user.username}</strong> (not{' '}
            <strong>{user.username}</strong>?
            <span onClick={logOutUser} className="logout">
              {' '}
              Log out
            </span>
            )
          </p>
          <p>
            From your account dashboard you can view your{' '}
            <Link to={'/my-account/customer/orders'}> recent orders</Link>,
            manage your{' '}
            <Link to={'/my-account/customer/address-list'}>
              shipping and billing addresses
            </Link>
            , and{' '}
            <Link to={'/my-account/account-details'}>
              edit your password and account details
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
