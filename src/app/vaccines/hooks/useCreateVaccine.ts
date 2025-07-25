import { useMutation } from "@tanstack/react-query";

export type CreateVaccineRequest = {
  name: string;
  dateReceived: Date;
  petId: string;
};

export type CreateVaccineProps = {
  onSuccess: () => void;
};

export const useCreateVaccine = ({ onSuccess }: CreateVaccineProps) => {
  return useMutation({
    mutationFn: async (request: CreateVaccineRequest) => {
      const response = await fetch("/api/vaccines", {
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
