"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCreatePet, CreatePetRequest } from "../hooks/useCreatePet";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { animalTypeOptions } from "@/app/options";

export default function CreatePetForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createPet, isPending } = useCreatePet({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      router.push(`/pets/${data.id}`);
    },
  });

  type FormValues = Omit<CreatePetRequest, "dob"> & { dob: Date | null };
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      animalType: "",
      ownerName: "",
      dob: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.dob) return;
    createPet({
      ...data,
      dob: data.dob,
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
        Add Pet
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Pet name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Pet Name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />

        <FormControl fullWidth error={!!errors.animalType} margin="normal">
          <InputLabel id="animal-type-label">Animal Type</InputLabel>
          <Controller
            name="animalType"
            control={control}
            rules={{ required: "Animal type is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="animal-type-label"
                label="Animal Type"
                value={field.value || ""}
                sx={{ marginBottom: 2 }}
              >
                {animalTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.animalType?.message}</FormHelperText>
        </FormControl>

        <Controller
          name="ownerName"
          control={control}
          rules={{ required: "Owner name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Owner Name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field: { onChange, value }, fieldState }) => (
              <DatePicker
                label="Date of Birth"
                format="MM/dd/yyyy"
                sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
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
          fullWidth
          sx={{
            borderRadius: "8px",
            marginTop: 4,
            marginBottom: 2,
            padding: "8px 16px",
            textTransform: "none",
          }}
          disabled={!isValid || isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Box>
  );
}
