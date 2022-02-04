import { createReducer } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  playlists: [],
  isLoading: false,
  tracks: [],
  currentPlaylist: {}
}

export const napsterReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase('@napster/startedLoading', (state) => ({
    ...state,
    isLoading: true
  }))
    .addCase('@napster/stoppedLoading', (state) => ({
      ...state,
      isLoading: false
    }))
    .addCase('@napster/initPlaylists', (state, { payload }) => ({
      ...state,
      playlists: payload,
      isLoading: false
    }))
    .addCase('@napster/changedTracks', (state, { payload }) => ({
      ...state,
      tracks: payload
    }))
    .addCase('@napster/changedCurrentPlaylist', (state, { payload }) => ({
      ...state,
      currentPlaylist: payload
    }));
  });
