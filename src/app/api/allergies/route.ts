import { NextRequest, NextResponse } from "next/server";
import { dbClient, schema } from "../../../db/dbClient";

export async function POST(req: NextRequest) {
  try {
    const { name, severity, reactions, petId } = await req.json();
    const [vaccine] = await dbClient
      .insert(schema.allergy)
      .values({ name, severity, reactions, petId })
      .returning();

    return NextResponse.json(vaccine);
  } catch (error) {
    console.error("Create allergy error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
