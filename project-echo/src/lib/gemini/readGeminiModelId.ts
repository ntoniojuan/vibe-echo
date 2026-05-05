export const readGeminiModelId = (): string => {
  const modelId = process.env.GEMINI_MODEL?.trim();
  return modelId && modelId.length > 0 ? modelId : "gemini-2.0-flash";
};
