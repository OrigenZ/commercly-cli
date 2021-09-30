import { useContext } from "react";
import { AuthContext } from "../../../../common/context/auth.context";

function Orders() {
  const { user } = useContext(AuthContext);
  return (
    <div className="section">
      <div className="dashboard-wrapper text-muted d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-sm-12 col-md-8 col-lg-10">
          <p>
            Hello <strong>{user.username}</strong>
          </p>
          <p>No orders found</p>
        </div>
      </div>
    </div>
  );
}

export default Orders;
