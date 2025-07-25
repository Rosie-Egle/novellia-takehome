import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../../../db/dbClient";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const vaccines = await dbClient
      .select()
      .from(schema.vaccine)
      .where(eq(schema.vaccine.petId, id));
    return NextResponse.json(vaccines);
  } catch (error) {
    console.error("Fetch vaccines error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
