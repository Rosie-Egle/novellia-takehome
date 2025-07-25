import { useMutation } from "@tanstack/react-query";

export type CreateAllergyRequest = {
  name: string;
  severity: string;
  reactions: string[];
  petId: string;
};

export type CreateAllergyProps = {
  onSuccess: () => void;
};

export const useCreateAllergy = ({ onSuccess }: CreateAllergyProps) => {
  return useMutation({
    mutationFn: async (request: CreateAllergyRequest) => {
      const response = await fetch("/api/allergies", {
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
