export type EchoAceCategoryNormalized = "aptitude" | "character" | "effectiveness";

export const normalizeEchoAceCategory = (
  input: string,
): EchoAceCategoryNormalized | null => {
  const normalized = input.trim().toLowerCase();
  if (normalized === "aptitude" || normalized === "head") {
    return "aptitude";
  }
  if (normalized === "character" || normalized === "heart") {
    return "character";
  }
  if (normalized === "effectiveness" || normalized === "hands") {
    return "effectiveness";
  }
  return null;
};
