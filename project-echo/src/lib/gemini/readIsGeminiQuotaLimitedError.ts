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

export const readIsGeminiQuotaLimitedError = (error: unknown): boolean => {
  if (error instanceof GoogleGenerativeAIFetchError && error.status === 429) {
    return true;
  }
  return readGeminiQuotaErrorResponse(flattenUnknownErrorMessage(error)) !== null;
};
