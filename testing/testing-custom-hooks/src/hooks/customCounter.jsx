import { useState, useCallback } from 'react';

const customCounter = initialValue => {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => setCount((x) => x + 1), []);

    return { count, increment }
}

export default customCounter;
