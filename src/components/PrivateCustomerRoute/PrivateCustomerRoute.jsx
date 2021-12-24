import { useContext } from 'react'
import { AuthContext } from '../../common/context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import Forbidden from '../../pages/Errors/Forbidden/Forbidden'

const PrivateCustomerRoute = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  if (isLoading) return <LoadingSpinner />
  if (!isLoggedIn) return <Navigate to="/login" />
  if (user.isAdmin) return <Forbidden />

  return <Outlet />
}

export default PrivateCustomerRoute
