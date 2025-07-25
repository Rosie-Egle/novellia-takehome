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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCreatePet, CreatePetRequest } from "../hooks/useCreatePet";

const animalTypeOptions = [
  { value: "DOG", label: "Dog" },
  { value: "CAT", label: "Cat" },
  { value: "BIRD", label: "Bird" },
  { value: "HAMSTER", label: "Hamster" },
  { value: "HORSE", label: "Horse" },
  { value: "OTHER", label: "Other" },
];

export default function CreatePetForm() {
  const { mutate: createPet, isPending } = useCreatePet();
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
