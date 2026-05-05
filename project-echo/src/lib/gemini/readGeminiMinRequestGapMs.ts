/**
 * Minimum spacing between consecutive Gemini `generateContent` calls in this Node process.
 * Helps stay under free-tier requests-per-minute when several users (or retries) share one API key.
 */
export const readGeminiMinRequestGapMs = (): number => {
  const raw = process.env.GEMINI_MIN_REQUEST_GAP_MS?.trim();
  if (!raw) {
    return 2_500;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 2_500;
  }
  return Math.min(parsed, 120_000);
};
