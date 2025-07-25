import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../../../db/dbClient";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const allergies = await dbClient
      .select()
      .from(schema.allergy)
      .where(eq(schema.allergy.petId, id));
    return NextResponse.json(allergies);
  } catch (error) {
    console.error("Fetch allergies error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
