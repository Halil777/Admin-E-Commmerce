import useSWR from "swr";
import { BASE_URL } from "../../api/base";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });

export const useCategories = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}category`, fetcher);

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}category/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Optimistically update the cache after deletion
      mutate(
        (currentData: any) =>
          currentData?.filter((category: any) => category.id !== id),
        false // Ensure cache isn't revalidated until explicitly needed
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    deleteCategory,
  };
};
