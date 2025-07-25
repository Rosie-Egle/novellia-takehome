"use client";

import { Box, Button } from "@mui/material";
import CreateAllergyForm from "./CreateAllergyForm";

export default function NewAllergyPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <CreateAllergyForm />
    </Box>
  );
}
