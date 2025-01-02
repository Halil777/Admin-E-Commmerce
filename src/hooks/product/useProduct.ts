import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProduct = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:3000/products",
    fetcher
  );

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      mutate((currentData: any) =>
        currentData.filter((product: any) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    products: data?.data, // Assuming your API returns { data: [...] }
    isLoading: !error && !data,
    isError: error,
    mutate,
    deleteProduct,
  };
};
