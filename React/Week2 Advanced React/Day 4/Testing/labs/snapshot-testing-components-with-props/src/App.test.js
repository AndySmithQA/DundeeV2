import { render, screen } from '@testing-library/react';
import {create} from 'react-test-renderer';
import App from './App';

it.skip('renders the edit instruction', () => {
  render(<App />);
  expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument();
});

describe(`Snapshot test of App`, () => {
  it(`should match the shapshot every render`, () => {
    const appSnapshot = create(<App />).toJSON();
    expect(appSnapshot).toMatchSnapshot();
  });
});