"use client";

import { useState } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import { schema } from "../../../db/dbClient";
import { useGetVaccinesByPetId } from "../../vaccines/hooks/useGetVaccinesByPetId";
import { addYears, format } from "date-fns";

type VaccineExpiration = { name: string; expirationInYears: number };
const vaccineExpirations: VaccineExpiration[] = [
  {
    name: "Rabies",
    expirationInYears: 3,
  },
  {
    name: "Distemper",
    expirationInYears: 1,
  },
  {
    name: "Parvovirus",
    expirationInYears: 1,
  },
  {
    name: "Bordetella",
    expirationInYears: 1,
  },
];

type VaccineWithExpiration = typeof schema.vaccine.$inferSelect & {
  isExpired: boolean;
};

export default function VaccineSection({
  petId,
  isEditable = false,
}: {
  petId: string;
  isEditable?: boolean;
}) {
  const { data: vaccines } = useGetVaccinesByPetId(petId);
  const vaccinesWithExpiration: VaccineWithExpiration[] =
    vaccines && vaccines.length
      ? vaccines?.map((vaccine: typeof schema.vaccine.$inferSelect) => {
          const expirationDate = addYears(
            vaccine.dateReceived,
            vaccineExpirations.find(
              (v: VaccineExpiration) => v.name === vaccine.name
            )?.expirationInYears || 0
          );

          return {
            ...vaccine,
            isExpired: expirationDate < new Date(),
          };
        })
      : [];

  return (
    <Box>
      <Typography variant="h5" marginBottom={2}>
        Vaccines
      </Typography>
      {vaccinesWithExpiration && vaccinesWithExpiration.length > 0 && (
        <>
          {vaccinesWithExpiration
            .sort(
              (
                a: typeof schema.vaccine.$inferSelect,
                b: typeof schema.vaccine.$inferSelect
              ) =>
                new Date(b.dateReceived).getTime() -
                new Date(a.dateReceived).getTime()
            )
            ?.map((vaccine: VaccineWithExpiration) => (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                key={vaccine.id}
                marginBottom={1}
              >
                <Box display="flex" flexDirection="row" gap={1}>
                  <Typography>{vaccine.name}</Typography>
                  {vaccine.isExpired ? (
                    <Chip
                      label="Expired"
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  ) : null}
                </Box>
                <Typography>
                  {format(vaccine.dateReceived, "MM/dd/yyyy")}
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
          href={`/pets/${petId}/vaccine/new`}
        >
          Add Vaccine
        </Button>
      )}
    </Box>
  );
}
