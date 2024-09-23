import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsyncComponent = () => {
    const [data, setData] = useState(null);

    const getData = async (mounted) => {
        try {
            const response = await axios.get(`http://ADDRESS:PORT/names`);
            setData(response.data);
        }
        catch (error) {
            if (error.response) {
                setData(<h3 data-testid="responseError">{error.response.status}: {error.response.statusText}</h3>)
            } else {
                setData(<h3 data-testid="networkError">There was a Network Error</h3>);
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (!data) {
        return <ul><li data-testid="loading">loading...</li></ul>
    }

    if (Array.isArray(data)) {
        const names = data.map(dataItem => <li data-testid="resolved" key={dataItem.id}>{dataItem.name}</li>);
        return <ul>{names}</ul>
    }

    return (
        <>{data}</>
    )
}

export default AsyncComponent;