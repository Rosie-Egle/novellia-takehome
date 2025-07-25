"use client";

import { Box, Button } from "@mui/material";
import { schema } from "../../../db/dbClient";
import { useGetVaccinesByPetId } from "../../vaccines/hooks/useGetVaccinesByPetId";
import { useGetAllergiesByPetId } from "../../allergies/hooks/useGetAllergiesByPetId";
import { addYears, format } from "date-fns";
import {
  animalTypeOptions,
  reactionOptions,
  severityOptions,
} from "../../options";
import VaccineSection from "./VaccineSection";

export default function PetCard({
  pet,
}: {
  pet: typeof schema.pets.$inferSelect;
}) {
  const { data: allergies } = useGetAllergiesByPetId(pet.id);

  return (
    <Box key={pet.id}>
      <div>{pet.name}</div>
      <div>
        {
          animalTypeOptions.find((option) => option.value === pet.animalType)
            ?.label
        }
      </div>
      <div>Owner: {pet.ownerName}</div>
      <div>DOB: {format(pet.dob, "MM/dd/yyyy")}</div>
      <VaccineSection petId={pet.id} />
      {allergies && (
        <>
          <div>Allergies:</div>
          {allergies?.map((allergy: typeof schema.allergy.$inferSelect) => (
            <div key={allergy.id}>
              <div>Name: {allergy.name}</div>
              <div>
                Severity:{" "}
                {
                  severityOptions.find(
                    (option) => option.value === allergy.severity
                  )?.label
                }
              </div>
              <div>
                Reactions:{" "}
                {allergy.reactions
                  .map(
                    (reaction) =>
                      reactionOptions.find(
                        (option) => option.value === reaction
                      )?.label
                  )
                  .join(", ")}
              </div>
            </div>
          ))}
        </>
      )}
      <Button href={`/pets/${pet.id}/allergy/new`}>Add Allergy</Button>
    </Box>
  );
}
