import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSubcategories = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/subcategories",
    fetcher
  );

  const deleteSubcategory = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/subcategories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete subcategory");
      }

      // Optimistically update the local data after deletion
      mutate((currentData: any) =>
        currentData.filter((subcategory: any) => subcategory.id !== id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    subcategories: data,
    isLoading,
    isError: !!error,
    mutate,
    deleteSubcategory,
  };
};
