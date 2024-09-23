import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import App from './App';

it('renders the edit instruction', () => {
  render(<App />);
  expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
});

it('increments count on button click', () => {
  render(<App />);
  expect(screen.getByText('count is 0')).toBeInTheDocument();

  fireEvent.click(screen.getByText('count is 0'));
  expect(screen.getByText('count is 1')).toBeInTheDocument();
});

it('increments count on button click using act', () => {
  render(<App />);
  expect(screen.getByText('count is 0')).toBeInTheDocument();

  act(() => {
    screen.getByText('count is 0').click();
  });

  expect(screen.getByText('count is 1')).toBeInTheDocument();
});