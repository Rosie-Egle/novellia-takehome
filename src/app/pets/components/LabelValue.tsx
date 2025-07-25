"use client";

import { Box, Typography } from "@mui/material";

export default function LabelValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      paddingBottom={1}
      width="100%"
      justifyContent="space-between"
    >
      <Typography fontWeight="bold" paddingRight={1}>
        {label}:
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}
