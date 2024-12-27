import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useBrand = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:3000/brands",
    fetcher
  );

  const deleteBrand = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/brands/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete brands");
      }

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
