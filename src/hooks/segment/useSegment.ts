import useSWR, { mutate } from "swr";
import { BASE_URL } from "../../api/base";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export const useSegment = () => {
  const { data, error } = useSWR(`${BASE_URL}segment`, fetcher);

  const deleteSegment = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}segment/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete segment");
      }

      // Optimistically update the cache by removing the deleted segment
      mutate(
        `${BASE_URL}segment`, // Pass the key to mutate the correct SWR cache
        (currentData: any) =>
          currentData?.filter((segment: any) => segment.id !== id),
        false // Do not revalidate immediately
      );
    } catch (error) {
      console.error("Error deleting segment:", error);
      throw error;
    }
  };

  return {
    segments: data, // Return `data` for fetched segments
    isLoading: !error && !data, // Loading is true when there's no error and no data yet
    isError: !!error, // Convert error to a boolean
    mutate, // Expose `mutate` for custom revalidation
    deleteSegment, // Expose the delete function
  };
};
