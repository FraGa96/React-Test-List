import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderUsingProviders, getServer } from '../../testUtils';
import PlayListView from './PlaylistView';

const server = getServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('show playlist tracks', async () => {
  const { getByTestId } = renderUsingProviders(<PlayListView />, {
    useRouter: true,
    routerOptions: {
      routeWithParamsDefinition: '/napster/:playlistId',
      route: '/napster/pp.225974698'
    }
  });

  const loader = getByTestId('loader');
  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId('ol-playlistview').children).toHaveLength(11);
  });
});
