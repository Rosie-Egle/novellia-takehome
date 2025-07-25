"use client";

import { Box, Button } from "@mui/material";
import CreateVaccineForm from "./CreateVaccineForm";

export default function NewVaccinePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <CreateVaccineForm />
    </Box>
  );
}
