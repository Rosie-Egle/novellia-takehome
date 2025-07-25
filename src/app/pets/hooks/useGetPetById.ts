import { useQuery } from "@tanstack/react-query";

export const useGetPetById = (id: string) => {
  return useQuery({
    queryKey: ["pets", id],
    queryFn: async () => {
      const response = await fetch(`/api/pets/${id}`);

      return response.json();
    },
    enabled: !!id,
  });
};
