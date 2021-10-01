import React, { useState, useEffect } from 'react'
import axiosInstance from '../http/index'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const verifyStoredToken = async () => {
    const storedToken = localStorage.getItem('authToken')

    if (storedToken) {
      try {
        const jwtPayload = await axiosInstance.get(`/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        const fetchUser = await axiosInstance.get(
          `/api/users/${jwtPayload.data._id}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        )
        setUser(fetchUser.data)
        setIsLoggedIn(true)
        setIsLoading(false)
      } catch (err) {
        setIsLoggedIn(false)
        setUser(null)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  const logInUser = (token) => {
    localStorage.setItem('authToken', token)
    verifyStoredToken()
  }

  const logOutUser = () => {
    localStorage.removeItem('authToken')

    setIsLoggedIn(false)
    setUser(null)
  }

  useEffect(() => {
    verifyStoredToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logInUser,
        logOutUser,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
