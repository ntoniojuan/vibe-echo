import { NextResponse } from "next/server";
import { checkRefinementRateLimit } from "@/lib/api/checkRefinementRateLimit";
import { readRefinementApiKeyDeniedResponse } from "@/lib/api/readRefinementApiKeyDeniedResponse";

export const runRefinementRouteGuards = (request: Request): NextResponse | null => {
  const keyDenied = readRefinementApiKeyDeniedResponse(request);
  if (keyDenied) {
    return keyDenied;
  }

  const rateDenied = checkRefinementRateLimit(request);
  if (rateDenied) {
    return rateDenied;
  }

  return null;
};
