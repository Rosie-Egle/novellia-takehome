import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../../db/dbClient";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const [pet] = await dbClient
      .select()
      .from(schema.pets)
      .where(eq(schema.pets.id, id));
    return NextResponse.json(pet);
  } catch (error) {
    console.error("Fetch pet error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
