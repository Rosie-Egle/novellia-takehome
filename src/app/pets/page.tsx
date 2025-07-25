"use client";

import { useGetAllPets } from "./hooks/useGetAllPets";
import { Box, Button, Typography } from "@mui/material";
import { schema } from "../../db/dbClient";
import PetCard from "./components/PetCard";

export default function NewPetPage() {
  const { data: pets, isLoading } = useGetAllPets();
  console.log("pets", pets);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      marginTop={4}
    >
      <Typography variant="h2" fontWeight="bold" marginBottom={3}>
        All Pets
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pets?.map((pet: typeof schema.pets.$inferSelect) => (
            <PetCard key={pet.id} pet={pet} isEditable={false} />
          ))}
        </div>
      )}
    </Box>
  );
}
