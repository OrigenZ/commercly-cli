import { useContext } from "react"
import { AuthContext } from "../../../context/auth.context"

import './Dashboard.css'

function Dashboard() {
  const { user, logOutUser } = useContext(AuthContext)
  //console.log('user', user)
  return (
    <div>
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <p>
            Hello <strong>{user.username}</strong> (not <strong>{user.username}</strong>
            ?<a onClick={logOutUser} href="/">Log out</a>)
          </p>
          <p>
            From your account dashboard you can view your{" "}
            <a href="/customer/orders">recent orders</a>, manage your{" "}
            <a href="/customer/address-list">shipping and billing addresses</a>,
            and <a href="customer/account-details">edit your password and account details</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
