import { z } from "zod";

const relationshipTypeSchema = z.union([
  z.literal(""),
  z.literal("supervisor"),
  z.literal("supervisee"),
  z.literal("colleague"),
  z.literal("self"),
]);

export const saveDraftRequestSchema = z.object({
  evaluationDraftId: z.string().min(1),
  currentStepIndex: z.number().int().min(0).max(10),
  status: z.enum(["draft", "submitted"]),
  shouldSetCreatedAt: z.boolean(),
  evaluateeName: z.string(),
  evaluateeEmail: z.string(),
  isAnonymous: z.boolean(),
  relationshipType: relationshipTypeSchema,
  evaluationReason: z.string(),
  aptitudeObservations: z.string(),
  characterObservations: z.string(),
  effectivenessObservations: z.string(),
  gainsRatings: z.record(z.string(), z.number()),
});

export type SaveDraftRequestBody = z.infer<typeof saveDraftRequestSchema>;
