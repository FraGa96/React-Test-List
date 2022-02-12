import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { persistSession } from '../slices/authSlice';

export const useAuthPersistance = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = localStorage.getItem('userData')

    if(userData) {
      dispatch(persistSession())
    }
  }, [])
}
