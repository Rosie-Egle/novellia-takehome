"use client";

import { useGetAllPets } from "../hooks/useGetAllPets";
import { Box, Button } from "@mui/material";
import { schema } from "../../../db/dbClient";
import { useGetPetById } from "../hooks/useGetPetById";
import { useParams } from "next/navigation";
import PetCard from "../components/PetCard";

export default function NewPetPage() {
  const { id } = useParams();
  const { data: pet, isLoading } = useGetPetById(id as string);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      {isLoading ? <div>Loading...</div> : <PetCard pet={pet} isEditable />}
    </Box>
  );
}
