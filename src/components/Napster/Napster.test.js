import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';

import { renderUsingProviders, getServer } from '../../testUtils';
import Napster from './Napster';

const server = getServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('show playlists', async () => {
  const { getByTestId } = renderUsingProviders(<Napster />, { useRouter: true });

  const loader = getByTestId('loader');
  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();
    expect(screen.getByText(/Consumiendo API de Napster/i)).toBeInTheDocument();
  });
});
