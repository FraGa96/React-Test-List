import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingStarted } from '../slices/napsterSlice';
import { getPlaylists } from '../services/getPlaylists'

export const usePlaylists = () => {
  const state = useSelector(state => state.napster)
  const dispatch = useDispatch()

  const getTopPlaylist = () => {
    dispatch(loadingStarted())
    getPlaylists()
      .then(playlists => {
        dispatch({ type: '@napster/initPlaylists', payload: playlists })
      })
  }

  useEffect(() => {
    getTopPlaylist()
  }, [])

  return {
    playlists: state.playlists,
    isLoading: state.isLoading
  }
}
