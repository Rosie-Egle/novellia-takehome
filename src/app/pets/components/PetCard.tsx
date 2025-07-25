"use client";

import { Box, Typography, Divider, Link } from "@mui/material";
import { schema } from "../../../db/dbClient";
import { format } from "date-fns";
import { animalTypeOptions } from "../../options";
import VaccineSection from "./VaccineSection";
import AllergiesSection from "./AllergiesSection";
import LabelValue from "./LabelValue";

export default function PetCard({
  pet,
  isEditable = false,
}: {
  pet: typeof schema.pets.$inferSelect;
  isEditable?: boolean;
}) {
  return (
    <Box
      key={pet.id}
      bgcolor="white"
      p={2}
      marginTop={4}
      borderRadius={"8px"}
      boxShadow={"0px 0px 4px rgba(33, 34, 36, 0.1)"}
      width={600}
      display="flex"
      flexDirection="column"
    >
      {!isEditable ? (
        <Link href={`/pets/${pet.id}`}>
          <Typography variant="h2" marginBottom={3}>
            {pet.name}
          </Typography>
        </Link>
      ) : (
        <Typography variant="h2" marginBottom={3}>
          {pet.name}
        </Typography>
      )}
      <LabelValue
        label="Species"
        value={
          animalTypeOptions.find((option) => option.value === pet.animalType)
            ?.label ?? ""
        }
      />

      <LabelValue label="Owner" value={pet.ownerName} />
      <LabelValue label="DOB" value={format(pet.dob, "MM/dd/yyyy")} />
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <VaccineSection petId={pet.id} isEditable={isEditable} />
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <AllergiesSection petId={pet.id} isEditable={isEditable} />
    </Box>
  );
}
