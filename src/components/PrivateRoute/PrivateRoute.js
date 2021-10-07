import { useContext } from 'react'
import { AuthContext } from '../../common/context/Auth.context'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = (props) => {
  const { to, exact, component: Component, ...restProps } = props
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  // If the authentication is still loading
  if (isLoading)
    return (
      <>
        <div class="spinner-border text-secondary position-absolute top-50 start-50" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </>
    )

  // If the user is not logged in
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  // If the user is logged in
  return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default PrivateRoute
