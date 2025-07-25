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

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  useCreateAllergy,
  CreateAllergyRequest,
} from "@/app/allergies/hooks/useCreateAllergy";
import { severityOptions, reactionOptions } from "@/app/options";

export default function CreateVaccineForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { id } = useParams();
  const { mutate: createAllergy, isPending } = useCreateAllergy({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergies", id] });
      router.push(`/pets/${id}`);
    },
  });

  type FormValues = Omit<CreateAllergyRequest, "severity" | "reactions"> & {
    severity: string;
    reactions: string[];
  };
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      severity: "",
      reactions: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.severity || !data.reactions) return;
    createAllergy({
      ...data,
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
        Add Allergy
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Allergy name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Allergy Name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />

        <FormControl fullWidth error={!!errors.severity} margin="normal">
          <InputLabel id="severity-label">Severity</InputLabel>
          <Controller
            name="severity"
            control={control}
            rules={{ required: "Severity is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="severity-label"
                label="Severity"
                value={field.value || ""}
                sx={{ marginBottom: 2 }}
              >
                {severityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.reactions?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.reactions} margin="normal">
          <InputLabel id="reactions-label">Reactions</InputLabel>
          <Controller
            name="reactions"
            control={control}
            rules={{ required: "Reactions is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="reactions-label"
                label="reactions"
                value={field.value || ""}
                multiple
                sx={{ marginBottom: 2 }}
              >
                {reactionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.reactions?.message}</FormHelperText>
        </FormControl>

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
