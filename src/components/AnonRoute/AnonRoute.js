import { useContext } from 'react'
import { AuthContext } from '../../common/context/Auth.context'
import { Redirect, Route } from 'react-router-dom'

const AnonRoute = (props) => {
  const { to, exact, component: Component, ...restProps } = props
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading)
    return (
      <>
        <div className="spinner-border text-secondary position-absolute top-50 start-50" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    )

  if (isLoggedIn) return <Redirect to="/my-account/dashboard" />

  return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default AnonRoute
