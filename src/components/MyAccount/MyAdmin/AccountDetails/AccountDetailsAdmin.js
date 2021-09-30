import { useContext } from "react";
import { AuthContext } from "../../../../common/context/auth.context";

function AccountDetails() {
  const { user } = useContext(AuthContext);
  //console.log('user', user)
  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <h3>User name: {user.username}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Shipping address: </h3>
          <h3>Billing address: </h3>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
