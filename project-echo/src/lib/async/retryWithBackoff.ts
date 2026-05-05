const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  options?: { attempts?: number; baseDelayMs?: number },
): Promise<T> => {
  const attempts = options?.attempts ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 400;
  let lastError: unknown;

  for (let attemptIndex = 0; attemptIndex < attempts; attemptIndex += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const isLastAttempt = attemptIndex === attempts - 1;
      if (isLastAttempt) {
        break;
      }
      const delayMs = baseDelayMs * 2 ** attemptIndex;
      await wait(delayMs);
    }
  }

  throw lastError;
};
