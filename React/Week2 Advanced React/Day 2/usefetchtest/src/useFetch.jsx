import { useEffect, useState } from "react";

export default function useFetch(url) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
    
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setError(null);
            setLoading(false);
          })
          .catch((e) => {
            console.warn(e.message);
            setError("Error fetching data. Try again.");
            setLoading(false);
          });
      }, [url]);

      return { loading, data, error };
}