import { useContext } from 'react'
import { AuthContext } from '../../common/context/Auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) return <LoadingSpinner />

  if (!isLoggedIn) return <Navigate to="/login" />
  
  return <Outlet />
}

export default PrivateRoute
