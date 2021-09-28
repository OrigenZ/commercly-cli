import { Switch, Route } from 'react-router-dom'

// import './App.css';

import HomePage from './pages/HomePage/HomePage'
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'
import SignupPage from './pages/MyAccount/SignupPage'
import LoginPage from './pages/MyAccount/LoginPage'
import AnonRoute from './components/AnonRoute/AnonRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          exact
          path="/about-us"
          render={(routeProps) => <AboutUsPage {...routeProps} />}
        />

        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
