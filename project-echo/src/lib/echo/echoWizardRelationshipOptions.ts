import type { EchoEvaluateeRelationshipType } from "@/lib/echo/echoEvaluateeRelationshipType";

export const echoWizardRelationshipOptions: Array<{
  value: EchoEvaluateeRelationshipType;
  label: string;
}> = [
  { value: "supervisor", label: "Supervisor" },
  { value: "supervisee", label: "Supervisee" },
  { value: "colleague", label: "Colleague" },
  { value: "self", label: "Self" },
];
