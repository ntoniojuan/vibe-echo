import { z } from "zod";

export const markSubmittedReadRequestSchema = z.object({
  evaluationDraftId: z.string().min(1),
});

export type MarkSubmittedReadRequestBody = z.infer<typeof markSubmittedReadRequestSchema>;
