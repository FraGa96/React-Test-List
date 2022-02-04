import { getPlaylistWithId } from "../services/getPlaylistWithId";
import { getTracks } from "../services/getTracks";
import { startLoading, stopLoading } from "./changeLoading"
import { changePlaylist } from "./changePlaylist";

export const changeTracks = tracks => {
  return { type: '@napster/changedTracks', payload: tracks }
}

export const setPlaylistTracks = (playlistId, limit = 10) => async (dispatch, getState) => {
  dispatch(startLoading());
  const { napster } = getState();

  if (napster.playlists.length > 0) {
    const playlist = napster.playlists.find((list) => list.id === playlistId);
    dispatch(changePlaylist(playlist));
  } else {
    const playlist = getPlaylistWithId(playlistId);
    dispatch(changePlaylist(playlist));
  }

  const tracks = await getTracks(playlistId, limit);
  dispatch(changeTracks(tracks));
  dispatch(stopLoading());
}
