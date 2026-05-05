/**
 * In `next dev`, refinement normally skips Gemini and uses fixed mock data.
 * Set ECHO_REFINEMENT_USE_REAL_GEMINI_IN_DEV=true to call Gemini (throttling + quota fallback still apply).
 */
export const readShouldUseRefinementDevelopmentMock = (): boolean => {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  return process.env.ECHO_REFINEMENT_USE_REAL_GEMINI_IN_DEV?.trim() !== "true";
};
