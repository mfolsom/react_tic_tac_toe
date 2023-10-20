import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


// Helper function to find a square by its text content
function findSquareByText(container, text) {
  return Array.from(container.querySelectorAll('button.square')).find(
    (square) => square.textContent === text
  );
}

test('renders Tic Tac Toe title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText('Tic Tac Toe');
  expect(titleElement).toBeInTheDocument();
});

test('renders a 3x3 game board', () => {
  const { container } = render(<App />);
  const squares = container.querySelectorAll('button.square');
  expect(squares.length).toBe(9);
});

test('allows X and O to take turns', () => {
  render(<App />);

  // Simulate clicking on a square
  const xButton = screen.getByTestId('square-0');
  fireEvent.click(xButton);

  // Verify that the button's text has changed
  expect(xButton).toHaveTextContent('X');

  // Simulate clicking on another square
  const oButton = screen.getByTestId('square-1');
  fireEvent.click(oButton);

  // Verify that the button's text has changed
  expect(oButton).toHaveTextContent('O');
});

test('prevents clicking on an already filled square', () => {
  render(<App />);

  // Simulate clicking on the same square twice
  const xButton = screen.getByTestId('square-0');
  fireEvent.click(xButton);
  fireEvent.click(xButton);

  // Verify that the button's text remains 'X'
  expect(xButton).toHaveTextContent('X');
});
