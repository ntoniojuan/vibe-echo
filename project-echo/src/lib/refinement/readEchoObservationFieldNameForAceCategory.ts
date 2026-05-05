import type { EchoAceCategoryNormalized } from "@/lib/refinement/echoAceCategoryNormalized";

export const readEchoObservationFieldNameForAceCategory = (
  category: EchoAceCategoryNormalized,
): "aptitudeObservations" | "characterObservations" | "effectivenessObservations" => {
  if (category === "aptitude") {
    return "aptitudeObservations";
  }
  if (category === "character") {
    return "characterObservations";
  }
  return "effectivenessObservations";
};
