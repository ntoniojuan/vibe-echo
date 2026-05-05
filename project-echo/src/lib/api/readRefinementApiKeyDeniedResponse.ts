import { NextResponse } from "next/server";

export const readRefinementApiKeyDeniedResponse = (
  request: Request,
): NextResponse | null => {
  const expectedKey = process.env.ECHO_REFINEMENT_API_KEY?.trim();

  if (!expectedKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("ECHO_REFINEMENT_API_KEY must be set in production.");
      return NextResponse.json({ error: "Server misconfiguration." }, { status: 503 });
    }
    return null;
  }

  const providedKey = request.headers.get("x-echo-refinement-key")?.trim();
  if (providedKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
};
