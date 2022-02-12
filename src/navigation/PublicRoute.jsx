import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({
}) => {
  const authStore = useSelector(({auth}) => auth);

  if(authStore.userData) {
    return <Navigate to='/' />
  } else {
    return <Outlet />
  }
}

export default PublicRoute
