"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  useCreateVaccine,
  CreateVaccineRequest,
} from "@/app/vaccines/hooks/useCreateVaccine";

export default function CreateVaccineForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { id } = useParams();
  const { mutate: createVaccine, isPending } = useCreateVaccine({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines", id] });
      router.push(`/pets/${id}`);
    },
  });

  type FormValues = Omit<CreateVaccineRequest, "dateReceived"> & {
    dateReceived: Date | null;
  };
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      dateReceived: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.dateReceived) return;
    createVaccine({
      ...data,
      dateReceived: data.dateReceived,
      petId: id as string,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Vaccine name is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Vaccine Name"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="dateReceived"
          control={control}
          rules={{ required: "Date received is required" }}
          render={({ field: { onChange, value }, fieldState }) => (
            <DatePicker
              label="Date Received"
              format="MM/dd/yyyy"
              value={value}
              onChange={onChange}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid || isPending}
      >
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
