import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initPlaylists } from '../slices/napsterSlice';

export const usePlaylists = () => {
  const state = useSelector(state => state.napster)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initPlaylists());
  }, [])

  return {
    playlists: state.playlists,
    isLoading: state.isLoading
  }
}
