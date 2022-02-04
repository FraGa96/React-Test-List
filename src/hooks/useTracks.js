import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadingStarted,
  loadingStopped,
  changeTracks,
  changeCurrentPlaylist
} from '../slices/napsterSlice'
import { getPlaylistWithId } from '../services/getPlaylistWithId'

export const useTracks = (id, limit = 10) => {
  const {
    playlists: allPlaylists,
    tracks,
    isLoading,
    currentPlaylist
  } = useSelector(state => state.napster)
  const dispatch = useDispatch()

  const setPlaylistTracks = async () => {
    dispatch(changeCurrentPlaylist(id))
    dispatch(changeTracks({ playlistId: id, limit }))
  }

  useEffect(() => {
    setPlaylistTracks()
  }, [])

  return {
    currentPlaylist,
    isLoading,
    tracks
  }
}
