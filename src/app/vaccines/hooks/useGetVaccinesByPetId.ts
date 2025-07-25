import { useQuery } from "@tanstack/react-query";

export const useGetVaccinesByPetId = (id: string) => {
  return useQuery({
    queryKey: ["vaccines", id],
    queryFn: async () => {
      const response = await fetch(`/api/pets/${id}/vaccines`);

      return response.json();
    },
    enabled: !!id,
  });
};
