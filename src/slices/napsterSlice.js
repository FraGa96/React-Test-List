import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPlaylists } from "../services/getPlaylists"
import { getPlaylistWithId } from "../services/getPlaylistWithId"
import { getTracks } from "../services/getTracks"

const initialValues = {
  playlists: [],
  isLoading: false,
  tracks: [],
  currentPlaylist: {}
}

export const initPlaylists = createAsyncThunk('@napster/initPlaylists', async () => {
  const playlists = await getPlaylists()
  return playlists
})

export const changeCurrentPlaylist = createAsyncThunk('@napster/changeCurrentPlaylist', async (payload, thunkApi) => {
  const {
    napster: {
      playlists
    }
  } = thunkApi.getState()

  let playlist = null

  if (napster.playlists.length > 0) {
    playlist = playlists.find((list) => list.id === payload)
  } else {
    playlist = await getPlaylistWithId(payload)
  }

  return playlist
})

export const changeTracks = createAsyncThunk('@napster/changeTracks', async (payload) => {
  const tracks = await getTracks(payload.playlistId, payload.limit)
  return tracks
})

export const napsterSlice = createSlice({
  name: '@napster',
  initialState: initialValues,
  reducers: {
    loadingStarted: (state) => ({
      ...state,
      isLoading: true
    }),
    loadingStopped: (state) => ({
      ...state,
      isLoading: false
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(initPlaylists.pending, (state) => ({
      ...state,
      isLoading: true
    }))
      .addCase(initPlaylists.fulfilled, (state, { payload }) => ({
        ...state,
        playlists: payload,
        isLoading: false
      }))
      .addCase(changeCurrentPlaylist.fulfilled, (state, { payload }) => ({
        ...state,
        currentPlaylist: payload
      }))
      .addCase(changeTracks.pending, (state) => ({
        ...state,
        isLoading: true
      }))
      .addCase(changeTracks.fulfilled, (state, { payload }) => ({
        ...state,
        tracks: payload,
        isLoading: false,
      }))
  }
})

export const {
  loadingStarted,
  loadingStopped,
} = napsterSlice.actions;

export const napsterReducer = napsterSlice.reducer;
