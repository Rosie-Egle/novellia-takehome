"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
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

export default function VaccineSection({ petId }: { petId: string }) {
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
      {vaccinesWithExpiration && vaccinesWithExpiration.length > 0 && (
        <>
          <div>Vaccines:</div>
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
              <div key={vaccine.id}>
                <div>Name: {vaccine.name}</div>
                {vaccine.isExpired ? <div>Expired</div> : null}
                <div>
                  Date Received: {format(vaccine.dateReceived, "MM/dd/yyyy")}
                </div>
              </div>
            ))}
        </>
      )}
      <Button href={`/pets/${petId}/vaccine/new`}>Add Vaccine</Button>
    </Box>
  );
}
