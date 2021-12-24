import { useContext } from "react";
import { AuthContext } from "../../common/context/Auth.context";
import NavMyAccount from "../../components/MyAccount/CustomerAccount/NavMyAccount/NavMyAccount";
import NavMyAdmin from "../../components/MyAccount/MyAdmin/NavMyAdmin/NavMyAdmin";

const MyAccountPage = () => {
  const { user } = useContext(AuthContext);
  return !user?.isAdmin ?
    (
      <section id="user-dashboard">
        <NavMyAccount />
      </section>
    ) : (
      <section id="user-dashboard">
        <NavMyAdmin />
      </section>
    );
}

export default MyAccountPage;
