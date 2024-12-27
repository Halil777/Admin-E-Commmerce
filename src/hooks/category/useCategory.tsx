import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCategories = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:3000/category",
    fetcher
  );

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Optimistically update the local data after deletion
      mutate((currentData: any) =>
        currentData.filter((category: any) => category.id !== id)
      );
    } catch (error) {
      console.error(error);
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
