import useSWR, { mutate } from "swr";
import { BASE_URL } from "../../api/base"; // Import dynamic base URL

// Fetcher function with error handling
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export const useSubcategories = () => {
  const { data, error } = useSWR(`${BASE_URL}subcategories`, fetcher);

  const deleteSubcategory = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}subcategories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete subcategory");
      }

      // Optimistically update the cache by removing the deleted subcategory
      mutate(
        `${BASE_URL}subcategories`, // Specify the key for SWR cache
        (currentData: any) =>
          currentData?.filter((subcategory: any) => subcategory.id !== id),
        false // Avoid immediate revalidation
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      throw error;
    }
  };

  return {
    subcategories: data, // Return fetched subcategories
    isLoading: !error && !data, // Loading is true when no error or data yet
    isError: !!error, // Convert error to boolean
    mutate, // Expose SWR mutate for custom revalidation
    deleteSubcategory, // Expose delete function
  };
};
