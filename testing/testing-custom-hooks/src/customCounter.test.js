import customCounter from './hooks/customCounter';
import { renderHook } from '@testing-library/react';
import { act } from 'react-test-renderer';

it(`Calling increment should increase the value of count by 1`, () => {
    const { result } = renderHook(() => customCounter(100));

    act(() => result.current.increment());

    expect(result.current.count).toBe(101);
});
