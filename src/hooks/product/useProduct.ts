import useSWR from "swr";
import { BASE_URL } from "../../api/base";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export const useProduct = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}products`, fetcher);

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Optimistically update the cache by removing the deleted product
      mutate(
        (currentData: any) =>
          currentData?.data?.filter((product: any) => product.id !== id),
        false // Prevent immediate revalidation
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return {
    products: data?.data || [], // Safely handle undefined `data`
    isLoading: !error && !data,
    isError: error,
    mutate,
    deleteProduct,
  };
};
