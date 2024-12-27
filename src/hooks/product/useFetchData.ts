import { useState, useEffect } from "react";
import axios from "axios";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetchData = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.data || null);
      } catch (err: any) {
        console.error("Error fetching data from", url, err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
