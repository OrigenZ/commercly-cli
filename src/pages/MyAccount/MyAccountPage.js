import { Switch, Route } from 'react-router-dom'

import Dashboard from "../../components/MyAccount/Dashboard/Dashboard";
import NavMyAccount from "../../components/MyAccount/NavMyAccount/NavMyAccount";
import Orders from "../../components/MyAccount/Orders/Orders";
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import Addresses from '../../components/MyAccount/Addresses/Addresses';
import AccountDetails from '../../components/MyAccount/AccountDetails/AccountDetails';

function MyAccountPage() {

    return (
        <div className='section'>
            <section id="user-dashboard" className="container">
                <NavMyAccount />
                <Switch> 
                    <PrivateRoute
                    exact
                    path="/customer"
                    component={Dashboard}
                    />
                    <PrivateRoute
                    exact
                    path="/customer/orders"
                    component={Orders}
                    />
                    <PrivateRoute
                    exact
                    path="/customer/address-list"
                    component={Addresses}
                    />
                    <PrivateRoute
                    exact
                    path="/customer/account-details"
                    component={AccountDetails}
                    />
                </Switch> 

            </section>
        </div>
    );
}

export default MyAccountPage;
