/**
 * Reads a refinement API response body as JSON.
 * Handles HTML/plain error pages (e.g. "Internal Server Error") without throwing from JSON.parse.
 */
export const readRefinementFetchJsonBody = async (
  response: Response,
): Promise<
  | { success: true; payload: unknown }
  | { success: false; message: string }
> => {
  const text = await response.text();
  const trimmed = text.trim();

  if (!trimmed) {
    if (response.ok) {
      return { success: true, payload: {} };
    }
    return {
      success: false,
      message: `Request failed (${String(response.status)}). Empty response body.`,
    };
  }

  try {
    const payload: unknown = JSON.parse(trimmed);
    return { success: true, payload };
  } catch {
    const preview = trimmed.replace(/\s+/g, " ").slice(0, 160);
    if (!response.ok) {
      return {
        success: false,
        message: `Request failed (${String(response.status)}). ${preview}`,
      };
    }
    return {
      success: false,
      message: `Unexpected response (not JSON): ${preview}`,
    };
  }
};
