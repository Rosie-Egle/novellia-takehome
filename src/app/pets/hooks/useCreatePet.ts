import { useMutation } from "@tanstack/react-query";

export type CreatePetRequest = {
  name: string;
  animalType: string;
  ownerName: string;
  dob: Date;
};

export type CreatePetProps = {
  onSuccess: (data: { id: string }) => void;
};

export const useCreatePet = ({ onSuccess }: CreatePetProps) => {
  return useMutation({
    mutationFn: async (request: CreatePetRequest) => {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...request,
        }),
      });
      return response.json();
    },
    onSuccess,
  });
};
