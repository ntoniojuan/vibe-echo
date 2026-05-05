import { isRetryableGeminiError } from "@/lib/gemini/isRetryableGeminiError";

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const retryGeminiRequest = async <T>(operation: () => Promise<T>): Promise<T> => {
  const maxAttempts = 3;
  const baseDelayMs = 600;
  let lastError: unknown;

  for (let attemptIndex = 0; attemptIndex < maxAttempts; attemptIndex += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const canRetry = isRetryableGeminiError(error);
      const isLastAttempt = attemptIndex === maxAttempts - 1;
      if (!canRetry || isLastAttempt) {
        console.error("Gemini request failed.", error);
        throw error;
      }
      const delayMs = baseDelayMs * 2 ** attemptIndex;
      await wait(delayMs);
    }
  }

  throw lastError;
};
