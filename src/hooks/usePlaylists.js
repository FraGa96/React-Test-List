import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoading } from '../actions/changeLoading'
import { initPlaylists } from '../actions/changePlaylist'
import { getPlaylists } from '../services/getPlaylists'

export const usePlaylists = () => {
  const state = useSelector(state => state.napster)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initPlaylists())
  }, [])

  return {
    playlists: state.playlists,
    isLoading: state.isLoading
  }
}
