import { useContext } from 'react'
import { AuthContext } from '../../common/context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const AnonRoute = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  if (isLoading) return <LoadingSpinner />

  if (isLoggedIn)
    return user.isAdmin ? (
      <Navigate to="/my-account/admin/dashboard" />
    ) : (
      <Navigate to="/my-account/customer/dashboard" />
    )

  return <Outlet />
}

export default AnonRoute
