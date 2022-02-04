import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaylistTracks } from '../actions/changeTracks'

export const useTracks = (id, limit = 10) => {
  const {
    tracks,
    isLoading,
    currentPlaylist
  } = useSelector(state => state.napster)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPlaylistTracks(id, limit))
  }, [])

  return {
    currentPlaylist,
    isLoading,
    tracks
  }
}
