import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadingStarted,
  loadingStopped,
  tracksChanged,
  currentPlaylistChanged
} from '../slices/napsterSlice'
import { getPlaylistWithId } from '../services/getPlaylistWithId'
import { getTracks } from '../services/getTracks'

export const useTracks = (id, limit = 10) => {
  const {
    playlists: allPlaylists,
    tracks,
    isLoading,
    currentPlaylist
  } = useSelector(state => state.napster)
  const dispatch = useDispatch()

  const changeCurrentPlaylist = async () => {
    return new Promise(resolve => {
      if (allPlaylists.length > 0) {
        const playlist = allPlaylists
          .filter(list => list.id === id)[0]
        dispatch(currentPlaylistChanged(playlist))
        resolve(true)
      } else {
        getPlaylistWithId(id)
          .then(playlist => {
            dispatch(currentPlaylistChanged(playlist))
            resolve(true)
          })
      }
    })
  }

  const changeListOfTracks = () => {
    return new Promise(resolve => {
      getTracks(id, limit)
        .then(tracks => {
          dispatch(tracksChanged(tracks))
          resolve(true)
        })
    })
  }

  const setPlaylistTracks = async () => {
    dispatch(loadingStarted())
    await changeCurrentPlaylist()
    await changeListOfTracks()
    dispatch(loadingStopped())
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
