import { useState } from "react";

interface UsePostResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (data: FormData) => Promise<void>;
}

const usePost = <T,>(baseUrl: string): UsePostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, postData };
};

export default usePost;
