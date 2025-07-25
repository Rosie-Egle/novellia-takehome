import { useQuery } from "@tanstack/react-query";

export const useGetAllergiesByPetId = (id: string) => {
  return useQuery({
    queryKey: ["allergies", id],
    queryFn: async () => {
      const response = await fetch(`/api/pets/${id}/allergies`);

      return response.json();
    },
    enabled: !!id,
  });
};
