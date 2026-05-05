const readGeminiQuotaExceededMessage = (): string =>
  "Gemini returned a quota or rate limit error (429). In Google AI Studio (aistudio.google.com), check your API key usage, project billing, and per-model limits. Try again after a few minutes, enable billing if you are on a free tier cap, or set GEMINI_MODEL to another id from npm run list-gemini-models (for example gemini-2.0-flash) and restart the dev server.";

/**
 * Maps thrown Gemini / Generative Language errors to a helpful API response when quota or rate limits apply.
 */
export const readGeminiQuotaErrorResponse = (
  message: string,
): { status: 429; error: string } | null => {
  const lower = message.toLowerCase();
  const isQuotaOrRateLimited =
    message.includes("429") ||
    lower.includes("quota") ||
    lower.includes("too many requests") ||
    lower.includes("resource exhausted") ||
    lower.includes("rate limit") ||
    lower.includes("rate-limit") ||
    lower.includes("exceeded your current quota") ||
    lower.includes("exceeded quota");

  if (!isQuotaOrRateLimited) {
    return null;
  }

  return {
    status: 429,
    error: readGeminiQuotaExceededMessage(),
  };
};
