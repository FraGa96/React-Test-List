import { createAction } from "@reduxjs/toolkit"
import { getPlaylists } from "../services/getPlaylists"
import { startLoading } from "./changeLoading"

export const changePlaylist = createAction('@napster/changedCurrentPlaylist', (playlist) => ({
  payload: playlist,
}))

export const initPlaylists = () => async (dispatch) => {
  dispatch(startLoading())
  const playlists = await getPlaylists()
  dispatch({ type: '@napster/initPlaylists', payload: playlists })
}
