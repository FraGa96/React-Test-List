import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
  playlists: [],
  isLoading: false,
  tracks: [],
  currentPlaylist: {}
}

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
    initPlaylists: (state, { payload }) => ({
      ...state,
      playlists: payload,
      isLoading: false
    }),
    tracksChanged: (state, { payload }) => ({
      ...state,
      tracks: payload
    }),
    currentPlaylistChanged: (state, { payload }) => ({
      ...state,
      currentPlaylist: payload
    })
  }
})

export const {
  loadingStarted,
  loadingStopped,
  initPlaylists,
  tracksChanged,
  currentPlaylistChanged,
} = napsterSlice.actions;

export const napsterReducer = napsterSlice.reducer;
