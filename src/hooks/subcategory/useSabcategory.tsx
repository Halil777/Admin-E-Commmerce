import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSubcategories = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:3001/subcategories",
    fetcher
  );

  const deleteSubcategory = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/subcategories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      mutate((currentData: any) =>
        currentData.filter((category: any) => category.id !== id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    subcategories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    deleteSubcategory,
  };
};
