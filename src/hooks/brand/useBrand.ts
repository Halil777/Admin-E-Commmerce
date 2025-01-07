import useSWR from "swr";

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useBrand = () => {
  // Get the base URL from environment variables
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data, error, mutate } = useSWR(`${BASE_URL}brands`, fetcher);

  const deleteBrand = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}brands/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete brand");
      }

      // Optimistically update the local data
      mutate((currentData: any) =>
        currentData.filter((brand: any) => brand.id !== id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    brands: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    deleteBrand,
  };
};
