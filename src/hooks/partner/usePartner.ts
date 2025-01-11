import useSWR, { mutate } from "swr";
import { BASE_URL } from "../../api/base";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export const usePartner = () => {
  const { data, error } = useSWR(`${BASE_URL}partners`, fetcher); // Changed URL to 'partners'

  const deletePartner = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}partners/${id}`, {
        // Changed URL to 'partners'
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete partner"); // Changed message
      }

      // Optimistically update the cache by removing the deleted partner
      mutate(
        `${BASE_URL}partners`, // Changed URL to 'partners'
        (currentData: any) => {
          if (!currentData) {
            return [];
          }
          return currentData?.filter((partner: any) => partner.id !== id);
        },
        false
      );
    } catch (error) {
      console.error("Error deleting partner:", error); // Changed message
      throw error;
    }
  };

  return {
    partners: data, // Changed key to 'partners'
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    deletePartner, // Changed key to 'deletePartner'
  };
};
