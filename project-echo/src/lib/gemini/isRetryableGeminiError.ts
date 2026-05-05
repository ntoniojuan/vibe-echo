export const isRetryableGeminiError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }
  const withStatus = error as { status?: number; code?: number; message?: string };
  const status = withStatus.status ?? withStatus.code;
  const message = String(withStatus.message ?? "").toLowerCase();

  if (status === 429) {
    return false;
  }
  if (message.includes("resource exhausted") || message.includes("quota")) {
    return false;
  }
  if (message.includes("too many requests")) {
    return false;
  }
  if (status !== undefined && (status === 500 || status === 503)) {
    return true;
  }
  return (
    message.includes("unavailable") ||
    message.includes("timeout") ||
    message.includes("500") ||
    message.includes("503")
  );
};
