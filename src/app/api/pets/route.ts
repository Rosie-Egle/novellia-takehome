import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../db/dbClient";

export async function POST(req: NextRequest) {
  try {
    const { name, animalType, ownerName, dob } = await req.json();
    const [pet] = await dbClient
      .insert(schema.pets)
      .values({ name, animalType, ownerName, dob })
      .returning();

    return NextResponse.json(pet);
  } catch (error) {
    console.error("Create pet error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const pets = await dbClient.select().from(schema.pets);
    return NextResponse.json(pets);
  } catch (error) {
    console.error("Fetch all pets error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
