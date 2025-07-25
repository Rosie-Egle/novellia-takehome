import { useQuery } from "@tanstack/react-query";

export const useGetAllPets = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await fetch("/api/pets");
      return response.json();
    },
  });
};
