import { readGeminiMinRequestGapMs } from "@/lib/gemini/readGeminiMinRequestGapMs";

const sleep = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

let queueTail: Promise<unknown> = Promise.resolve();
let lastFinishMs = 0;

/**
 * Runs one Gemini HTTP-equivalent operation at a time per server process, with a minimum gap after the previous call finished.
 */
export const runSerializedGeminiRequest = <T>(operation: () => Promise<T>): Promise<T> => {
  const next = queueTail.then(async () => {
    const gapMs = readGeminiMinRequestGapMs();
    const elapsedSinceLastFinish = Date.now() - lastFinishMs;
    const waitMs = Math.max(0, gapMs - elapsedSinceLastFinish);
    if (waitMs > 0) {
      await sleep(waitMs);
    }
    try {
      return await operation();
    } finally {
      lastFinishMs = Date.now();
    }
  });
  queueTail = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
};
