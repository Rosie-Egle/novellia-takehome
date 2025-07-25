import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../db/dbClient";

export async function POST(req: NextRequest) {
  try {
    const { name, dateReceived, petId } = await req.json();
    const [vaccine] = await dbClient
      .insert(schema.vaccine)
      .values({ name, dateReceived, petId })
      .returning();

    return NextResponse.json(vaccine);
  } catch (error) {
    console.error("Create vaccine error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
