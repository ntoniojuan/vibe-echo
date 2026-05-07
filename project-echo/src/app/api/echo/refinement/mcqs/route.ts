import { NextResponse } from "next/server";
import { readRefinementApiErrorPayload } from "@/lib/api/readRefinementApiErrorPayload";
import { runRefinementRouteGuards } from "@/lib/api/runRefinementRouteGuards";
import { refinementMcqsRequestSchema } from "@/lib/api/refinementRequestSchemas";
import { generateRefinementMCQs } from "@/lib/refinement/generateRefinementMCQs";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  const denied = runRefinementRouteGuards(request);
  if (denied) {
    return denied;
  }

  let jsonBody: unknown;
  try {
    jsonBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = refinementMcqsRequestSchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const items = await generateRefinementMCQs({
      rawNotes: parsed.data.rawNotes,
      aceCategory: parsed.data.aceCategory,
      gainsRatingsForPillar: parsed.data.gainsRatingsForPillar,
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("MCQ generation failed.", error);
    const payload = readRefinementApiErrorPayload(error);

    const message = error instanceof Error ? error.message : "Unexpected error.";
    const isClientError =
      message.includes("rawNotes must") ||
      message.includes("aceCategory must");

    if (isClientError) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: payload.error }, { status: payload.status });
  }
};
