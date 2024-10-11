// Example test using async/await for the App2 component
import { render, waitFor, cleanup } from '@testing-library/react';
import axiosMock from 'axios';
import AsyncComponent from './AsyncComponent';

afterEach(cleanup);

it('loads and displays data', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Hugh Mann' }] });
    
    const { getByTestId, getByText } = render(<AsyncComponent />);
    
    expect(getByTestId('loading')).toBeInTheDocument();
    
    await waitFor(() => expect(getByTestId('resolved')).toBeInTheDocument());
    
    expect(getByText('Hugh Mann')).toBeInTheDocument();
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

it('displays a network error message when the promise rejects due to a network error', async () => {
    axiosMock.get.mockRejectedValue(new Error('Network Error'));

    const { getByTestId } = render(<AsyncComponent />);

    expect(getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(getByTestId('networkError')).toBeInTheDocument());

    expect(getByTestId('networkError')).toHaveTextContent('There was a Network Error');
});

it('displays a 404 error when the promise rejects with a response status of 404', async () => {
    axiosMock.get.mockRejectedValue({
        response: {
            status: 404,
            statusText: 'Not Found',
        },
    });

    const { getByTestId } = render(<AsyncComponent />);

    expect(getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(getByTestId('responseError')).toBeInTheDocument());

    expect(getByTestId('responseError')).toHaveTextContent('404: Not Found');
});