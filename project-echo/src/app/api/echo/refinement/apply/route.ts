import { NextResponse } from "next/server";
import { readRefinementApiErrorPayload } from "@/lib/api/readRefinementApiErrorPayload";
import { runRefinementRouteGuards } from "@/lib/api/runRefinementRouteGuards";
import { refinementApplyRequestSchema } from "@/lib/api/refinementRequestSchemas";
import { applyRefinementFromMcqAnswers } from "@/lib/refinement/applyRefinementFromMcqAnswers";

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

  const parsed = refinementApplyRequestSchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const result = await applyRefinementFromMcqAnswers({
      draftId: parsed.data.draftId,
      rawNotes: parsed.data.rawNotes,
      aceCategory: parsed.data.aceCategory,
      mcqs: parsed.data.mcqs,
      answers: parsed.data.answers,
    });

    return NextResponse.json({
      success: true,
      appendedParagraph: result.appendedParagraph,
      fullObservationValue: result.fullObservationValue,
    });
  } catch (error) {
    console.error("Refinement apply failed.", error);

    const message = error instanceof Error ? error.message : "Unexpected error.";

    if (message.includes("not found")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    const isClientError =
      message.includes("rawNotes must") ||
      message.includes("aceCategory must") ||
      message.includes("mcqs and answers") ||
      message.includes("Each MCQ") ||
      message.includes("Answer for question") ||
      message.includes("too short");

    if (isClientError) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const payload = readRefinementApiErrorPayload(error);
    return NextResponse.json({ error: payload.error }, { status: payload.status });
  }
};
