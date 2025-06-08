import React from 'react'
import { useAuth } from '../context/authcontext'
import { Navigate } from 'react-router-dom'



const privateroute = ({children}) => {
    const { currentUser } = useAuth()
    if (currentUser) {
        return children
    }

  return ( <Navigate to="/login" replace />
    
  )
}

export default privateroute
