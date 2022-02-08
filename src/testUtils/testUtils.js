import { Provider } from 'react-redux';
import { matchPath, MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { napsterReducer } from '../slices/napsterSlice';
import featuredPlaylists from './featuredPlaylists.json';
import tracksFromPlaylist from './tracksFromPlaylist.json';

export const renderUsingProviders = (ui, {
  preloadedState,
  store = configureStore({ reducer: { napster: napsterReducer }, preloadedState }),
  useRouter = false,
  routerOptions = {
    initialHistoryEntries: [],
    routeWithParamsDefinition: '/',
    route: '/',
  },
  ...renderOptions
} = {}) => {
  const SimpleRouterWrapper = ({ children }) => {
    const initialHistoryEntries = routerOptions.initialHistoryEntries || []
    const initialEntries = [
      ...initialHistoryEntries,
      routerOptions.route
    ];
  
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={routerOptions.routeWithParamsDefinition} element={children} />
        </Routes>
      </MemoryRouter>
    )
  };

  // const RouterWrapper = ({ children }) => {
  //   return (
  //     <MemoryRouter initialEntries={initialEntries}>
  //       <Routes>
  //         <Route path={routerOptions.routeWithParamsDefinition} element={children} />
  //       </Routes>
  //     </MemoryRouter>
  //   )
  // }

  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        {useRouter ? (
          <SimpleRouterWrapper>
            {children}
          </SimpleRouterWrapper>
        ) : children}
      </Provider >
    )
  }

  return render(ui, {
    wrapper: Wrapper, ...renderOptions
  })
};

export const getServer = () => {
  const handlers = [
    rest.get('https://api.napster.com/v2.2/playlists/featured', (_req, res, ctx) => {
      const returnable = res(ctx.json(featuredPlaylists), ctx.delay(130));
      return returnable;
    }),
    rest.get('https://api.napster.com/v2.2/playlists/pp.225974698/tracks', (_req, res, ctx) => {
      const returnable = res(ctx.json(tracksFromPlaylist), ctx.delay(130));
      return returnable;
    }),
  ];
  return setupServer(...handlers);
};
