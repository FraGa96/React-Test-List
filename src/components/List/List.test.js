import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from './List';

/* eslint-disable */
test('renders List', () => {
  // Arrange
  const { getByText } = render(<List />);

  // Act
  const titleElement = getByText(/Testing List with/i);
  const ulElementChildren = screen.getByTestId('list-component').children;

  // Assert
  expect(titleElement).toBeInTheDocument();
  expect(ulElementChildren).toHaveLength(8);
});

test('It finds 1 item', () => {
  // Arrange
  const utils = render(<List />);
  const searchInput = utils.getByRole('textbox');
  const ulElementChildren = screen.getByTestId('list-component').children;

  
  // Act
  expect(ulElementChildren).toHaveLength(8);
  fireEvent.change(searchInput, { target: { value: 'mich' } });

  // Assert
  expect(ulElementChildren).toHaveLength(1);
});

test('It finds items that containts an e', () => {
  // Arrange
  const utils = render(<List />);
  const searchInput = utils.getByRole('textbox');
  const ulElementChildren = screen.getByTestId('list-component').children;

  // Act
  fireEvent.change(searchInput, { target: { value: 'e' } });

  // Assert
  expect(ulElementChildren).toHaveLength(4);
});

test('It has no matching results', () => {
  // Arrange
  const utils = render(<List />);
  const searchInput = utils.getByRole('textbox');
  const ulElementChildren = screen.getByTestId('list-component').children;

  // Act
  fireEvent.change(searchInput, { target: { value: 'xsxsxs' } });
  const uniqueChild = utils.getByText('No hay ningún item ;((');

  // Assert
  expect(ulElementChildren).toHaveLength(1);
  expect(uniqueChild).toBeInTheDocument();
});
