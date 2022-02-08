import { napsterReducer, loadingStarted, loadingStopped, initPlaylists } from './napsterSlice';
import featuredPlaylists from '../testUtils/featuredPlaylists.json';
import { getServer } from '../testUtils';
import { waitFor } from '@testing-library/react';

const INITIAL_STATE = {
  playlists: [],
  isLoading: false,
  tracks: [],
  currentPlaylist: {}
};

const server = getServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('should return inital state', () => {
  expect(napsterReducer(undefined, {})).toEqual({
    playlists: [],
    isLoading: false,
    tracks: [],
    currentPlaylist: {}
  });
});

test('should turn on isLoading flag', () => {
  const previousState = { ...INITIAL_STATE };
  expect(napsterReducer(previousState, loadingStarted())).toEqual({
    ...previousState,
    isLoading: true,
  });
});

test('should turn off isLoading flag', () => {
  const previousState = { ...INITIAL_STATE };
  expect(napsterReducer(previousState, loadingStopped())).toEqual({
    ...previousState,
    isLoading: false,
  });
});

test('should turn on isLoading flag while get playlists', () => {
  const previousState = { ...INITIAL_STATE };
  expect(napsterReducer(previousState, { type: '@napster/initPlaylists/pending' })).toEqual({
    ...previousState,
    isLoading: true,
  });
});

// test('should work fine with thunk', async () => {
//   const previousState = { ...INITIAL_STATE };
//   const reducer = napsterReducer(previousState, initPlaylists);
//   console.log(reducer)

//   await waitFor(() => {
//     expect(reducer).toEqual({
//       ...previousState,
//       playlists: [],
//       isLoading: true,
//     });
//   })
// });
