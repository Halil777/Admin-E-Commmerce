import useSWR, { mutate } from "swr";
import { BASE_URL } from "../../api/base";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export const useBanner = () => {
  const { data, error } = useSWR(`${BASE_URL}banner`, fetcher);

  const deleteBanner = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}banner/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      // Optimistically update the cache by removing the deleted banner
      mutate(
        `${BASE_URL}banner`,
        (currentData: any) => {
          if (!currentData) {
            return [];
          }
          return currentData?.filter((banner: any) => banner.id !== id);
        },
        false
      );
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  };

  return {
    banners: data, // Return `data` for fetched banners
    isLoading: !error && !data, // Loading is true when there's no error and no data yet
    isError: !!error, // Convert error to a boolean
    mutate, // Expose `mutate` for custom revalidation
    deleteBanner, // Expose the delete function
  };
};
