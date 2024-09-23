import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the edit instruction', () => {
  render(<App />);
  expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
});
