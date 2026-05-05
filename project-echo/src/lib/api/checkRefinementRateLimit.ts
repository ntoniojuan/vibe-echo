import { NextResponse } from "next/server";

const clientRequestBuckets = new Map<
  string,
  { count: number; windowStartMs: number }
>();

const readRefinementMaxRequestsPerWindow = (): number => {
  const raw = process.env.ECHO_REFINEMENT_MAX_REQUESTS_PER_MINUTE?.trim();
  if (!raw) {
    return 10;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 10;
  }
  return Math.min(parsed, 120);
};

const refinementWindowMs = 60_000;

const readClientKey = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return request.headers.get("x-real-ip") ?? "local";
};

export const checkRefinementRateLimit = (request: Request): NextResponse | null => {
  const clientKey = readClientKey(request);
  const maxPerWindow = readRefinementMaxRequestsPerWindow();
  const now = Date.now();
  const bucket = clientRequestBuckets.get(clientKey);

  if (!bucket || now - bucket.windowStartMs > refinementWindowMs) {
    clientRequestBuckets.set(clientKey, { count: 1, windowStartMs: now });
    return null;
  }

  if (bucket.count >= maxPerWindow) {
    return NextResponse.json(
      { error: "Too many refinement requests. Try again in a minute." },
      { status: 429 },
    );
  }

  bucket.count += 1;
  return null;
};
