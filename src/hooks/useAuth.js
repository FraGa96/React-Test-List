import { useMemo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export const useAuth = () => {
  const {
    userData,
    token,
    ...restData
  } = useSelector((state) => state.auth, shallowEqual);

  const isLoggedIn = useMemo(() => !!(userData && token), [userData, token])

  return {
    isLoggedIn,
    ...restData
  }
}
