"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
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
    <Box
      bgcolor="white"
      p={2}
      marginTop={4}
      borderRadius={"8px"}
      boxShadow={"0px 0px 4px rgba(33, 34, 36, 0.1)"}
      width={600}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h2" marginBottom={3}>
        Add Vaccine
      </Typography>
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
              sx={{ marginBottom: 2 }}
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
                    sx: { marginBottom: 2, marginTop: 2, width: "100%" },
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
          fullWidth
          sx={{
            borderRadius: "8px",
            marginTop: 4,
            marginBottom: 2,
            padding: "8px 16px",
            textTransform: "none",
          }}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Box>
  );
}
