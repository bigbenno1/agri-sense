import { useState, useEffect } from 'react';

const useFetch = (url, interval = null) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setData({ status: "Offline", message: "Backend connection failed" });
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval if specified
    let intervalId;
    if (interval) {
      intervalId = setInterval(fetchData, interval);
    }

    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [url, interval]);

  return { data, loading, error };
};

export default useFetch;