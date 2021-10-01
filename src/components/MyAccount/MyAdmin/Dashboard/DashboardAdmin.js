import { useContext } from 'react'
import { AuthContext } from '../../../../common/context/Auth.context'

import './Dashboard.css'

function Dashboard() {
  const { user, logOutUser } = useContext(AuthContext)
  return (
    <div>
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <p>
            Hello <strong>{user.username}</strong> (not{' '}
            <strong>{user.username}</strong>?
            <a onClick={logOutUser} href="/">
              Log out
            </a>
            )
          </p>
          <p>
            From your account dashboard you can manage your{' '}
            <a href="/categories">products</a>, manage your{' '}
            <a href="/products">categories</a>, and{' '}
            <a href="/account-details">
              edit your password and account details
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
