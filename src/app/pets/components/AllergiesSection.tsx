"use client";

import { useState } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import { schema } from "../../../db/dbClient";
import { useGetAllergiesByPetId } from "../../allergies/hooks/useGetAllergiesByPetId";

import { reactionOptions, severityOptions } from "../../options";

export default function AllergiesSection({
  petId,
  isEditable = false,
}: {
  petId: string;
  isEditable?: boolean;
}) {
  const { data: allergies } = useGetAllergiesByPetId(petId);

  return (
    <Box>
      <Typography variant="h5" marginBottom={2}>
        Allergies
      </Typography>
      {allergies && allergies.length > 0 && (
        <>
          {allergies?.map((allergy: typeof schema.allergy.$inferSelect) => (
            <Box key={allergy.id}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1}
              >
                <Typography fontWeight="bold">{allergy.name}</Typography>
                <Typography>
                  {
                    severityOptions.find(
                      (option) => option.value === allergy.severity
                    )?.label
                  }
                </Typography>
              </Box>
              <Typography>
                {allergy.reactions
                  .map(
                    (reaction) =>
                      reactionOptions.find(
                        (option) => option.value === reaction
                      )?.label
                  )
                  .join(", ")}
              </Typography>
            </Box>
          ))}
        </>
      )}
      {isEditable && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "8px",
            marginTop: 4,
            marginBottom: 2,
            padding: "8px 16px",
            textTransform: "none",
            width: "100%",
          }}
          href={`/pets/${petId}/allergy/new`}
        >
          Add Allergy
        </Button>
      )}
    </Box>
  );
}
