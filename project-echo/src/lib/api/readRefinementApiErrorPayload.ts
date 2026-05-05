import { GoogleGenerativeAIFetchError } from "@google/generative-ai";
import { readGeminiQuotaErrorResponse } from "@/lib/gemini/readGeminiQuotaErrorResponse";

const flattenUnknownErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return String(error);
  }
  const segments = [error.message];
  if (error instanceof GoogleGenerativeAIFetchError) {
    if (error.status !== undefined) {
      segments.push(`status:${String(error.status)}`);
    }
    if (error.statusText) {
      segments.push(error.statusText);
    }
  }
  return segments.join(" ");
};

/**
 * Turns thrown errors from refinement routes into HTTP status + safe client message.
 * Uses HTTP status from {@link GoogleGenerativeAIFetchError} so 429 is detected even when `message` omits "429".
 */
export const readRefinementApiErrorPayload = (
  error: unknown,
): { status: number; error: string } => {
  const flatMessage = flattenUnknownErrorMessage(error);
  const fetchError =
    error instanceof GoogleGenerativeAIFetchError ? error : undefined;

  if (fetchError?.status === 429) {
    return readGeminiQuotaErrorResponse("429")!;
  }

  const quotaFromMessage = readGeminiQuotaErrorResponse(flatMessage);
  if (quotaFromMessage) {
    return quotaFromMessage;
  }

  if (flatMessage.includes("GOOGLE_GENERATIVE_AI_API_KEY")) {
    return {
      status: 503,
      error:
        "Server is not configured with GOOGLE_GENERATIVE_AI_API_KEY. Add your Google AI Studio API key to project-echo/.env.local and restart the dev server.",
    };
  }

  if (fetchError?.status === 403 || fetchError?.status === 401) {
    return {
      status: 502,
      error:
        "Gemini API returned 401/403. Verify GOOGLE_GENERATIVE_AI_API_KEY in .env.local is a valid key for Google AI Studio.",
    };
  }

  if (fetchError?.status === 404) {
    return {
      status: 502,
      error:
        "Gemini model not found (404). Your key may not expose that model id (aliases like gemini-1.5-flash are often retired). From project-echo run: npm run list-gemini-models — then set GEMINI_MODEL to a listed idForSdk (often gemini-2.0-flash or gemini-2.5-flash). Restart npm run dev.",
    };
  }

  if (fetchError?.status === 400) {
    return {
      status: 502,
      error:
        "Gemini API returned 400 (bad request). Check GEMINI_MODEL and that the Generative Language API is enabled for your project.",
    };
  }

  if (process.env.REFINEMENT_DEBUG === "1") {
    return { status: 502, error: flatMessage.slice(0, 800) };
  }

  return { status: 502, error: "Upstream refinement service failed." };
};
