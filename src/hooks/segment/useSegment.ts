import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSegment = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/segment",
    fetcher
  );

  const deleteSegment = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/segment/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete segment");
      }

      // Optimistically update the local data after deletion
      mutate((currentData: any) =>
        currentData.filter((segment: any) => segment.id !== id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    segment: data,
    isLoading,
    isError: !!error,
    mutate,
    deleteSegment,
  };
};
