"use client";

import { useGetAllPets } from "./hooks/useGetAllPets";
import { Box, Button } from "@mui/material";
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
    >
      <div>All Pets</div>
      <Button variant="contained" color="primary" href="/pets/new">
        Add Pet
      </Button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pets?.map((pet: typeof schema.pets.$inferSelect) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </Box>
  );
}
