import {
  echoCollapsedEmptyEvaluationReasonLabel,
  readCollapsedEvaluationReasonSnippet,
} from "@/lib/dashboard/readCollapsedEvaluationReasonSnippet";
import { readRelativeTimeShortLabel } from "@/lib/dashboard/readRelativeTimeShortLabel";
import type { EchoEvaluationDocumentRecord } from "@/lib/firebase/echoEvaluationDocumentRecordType";

type EchoDashboardInboxTabId = "review" | "feedback" | "myEvals";

const newBadgeFreshMs = 24 * 60 * 60 * 1000;
const updatedVsCreatedMs = 60 * 60 * 1000;

type EchoDashboardInboxCardViewModel = {
  documentId: string;
  title: string;
  snippet: string;
  relativeTimeLabel: string;
  fromLine: string;
  fromLineUsePlaceholderStyle: boolean;
  snippetUsePlaceholderStyle: boolean;
  badgeLabel: string | null;
  badgeClassName: string | null;
  acePills: readonly {
    shortLabel: string;
    description: string;
    filled: boolean;
  }[];
};

const readRelationshipLabel = (relationshipType: string): string => {
  if (relationshipType === "") {
    return "Relationship not set";
  }
  return `${relationshipType.charAt(0).toUpperCase()}${relationshipType.slice(1)}`;
};

const readInboxBadge = (
  variant: EchoDashboardInboxTabId,
  updatedAt: Date,
  createdAt: Date,
): { label: string; className: string } | null => {
  const ageMs = Date.now() - updatedAt.getTime();
  const stepMs = updatedAt.getTime() - createdAt.getTime();

  if (variant === "review") {
    if (ageMs < newBadgeFreshMs) {
      return {
        label: "In progress",
        className: "bg-primary/20 text-primary",
      };
    }
    if (stepMs > updatedVsCreatedMs) {
      return {
        label: "Updated",
        className: "bg-secondary/15 text-secondary",
      };
    }
    return null;
  }

  if (ageMs < newBadgeFreshMs) {
    return {
      label: "New",
      className: "bg-primary/20 text-primary",
    };
  }
  if (stepMs > updatedVsCreatedMs) {
    return {
      label: "Updated",
      className: "bg-[#bfdbfe]/90 text-[#1d4ed8]",
    };
  }
  return null;
};

export const readEchoDashboardInboxCardViewModel = (
  record: EchoEvaluationDocumentRecord,
  variant: EchoDashboardInboxTabId,
): EchoDashboardInboxCardViewModel => {
  const { payload, documentId } = record;
  const name = payload.evaluateeName.trim();
  const relationship = readRelationshipLabel(payload.relationshipType);

  const relativeTimeLabel = readRelativeTimeShortLabel(payload.updatedAt);

  let title: string;
  let fromLine: string;
  let snippetMax = 120;
  let fromLineUsePlaceholderStyle = false;

  if (variant === "review") {
    title = name.length > 0 ? `Finish · ${name}` : "Finish evaluation";
    fromLine =
      name.length > 0 ? `Evaluatee · ${name} · ${relationship}` : `Draft · ${relationship}`;
    snippetMax = 100;
  } else if (variant === "feedback") {
    title = "Feedback received";
    let evaluatorNote = "From · Unknown evaluator";
    if (payload.isAnonymous === true) {
      evaluatorNote = "From · Anonymous Teammate";
    } else if (payload.evaluatorEmail.trim().length > 0) {
      evaluatorNote = `From · ${payload.evaluatorEmail}`;
    }
    fromLine = `${evaluatorNote} · ${relationship}`;
    snippetMax = 100;
    const anonymousSubmission = payload.isAnonymous === true;
    const unknownEvaluator =
      !anonymousSubmission && payload.evaluatorEmail.trim().length === 0;
    fromLineUsePlaceholderStyle = anonymousSubmission || unknownEvaluator;
  } else if (payload.status === "draft") {
    title = name.length > 0 ? `Draft · ${name}` : "Draft evaluation";
    fromLine =
      name.length > 0 ? `Evaluatee · ${name} · ${relationship}` : `Draft · ${relationship}`;
    snippetMax = 100;
  } else {
    title = name.length > 0 ? `Submitted · ${name}` : "Submitted evaluation";
    fromLine = `For · ${name.length > 0 ? name : "Evaluatee"} · ${relationship}`;
    snippetMax = 120;
  }

  const badgeVariant: EchoDashboardInboxTabId =
    variant === "myEvals" && payload.status === "draft" ? "review" : variant;
  let badge = readInboxBadge(badgeVariant, payload.updatedAt, payload.createdAt);
  if (variant === "feedback" && payload.isRead === true) {
    badge = null;
  }

  const snippet = readCollapsedEvaluationReasonSnippet(payload.evaluationReason, snippetMax);
  const snippetUsePlaceholderStyle = snippet === echoCollapsedEmptyEvaluationReasonLabel;

  const acePills = [
    {
      shortLabel: "Head",
      description:
        "Aptitude (Head) — this chip highlights when the evaluation includes written observations for Aptitude.",
      filled: payload.aptitudeObservations.trim().length > 0,
    },
    {
      shortLabel: "Heart",
      description:
        "Character (Heart) — highlights when written observations for Character are present.",
      filled: payload.characterObservations.trim().length > 0,
    },
    {
      shortLabel: "Hands",
      description:
        "Effectiveness (Hands) — highlights when written observations for Effectiveness are present.",
      filled: payload.effectivenessObservations.trim().length > 0,
    },
  ] as const;

  return {
    documentId,
    title,
    snippet,
    relativeTimeLabel,
    fromLine,
    fromLineUsePlaceholderStyle,
    snippetUsePlaceholderStyle,
    badgeLabel: badge?.label ?? null,
    badgeClassName: badge?.className ?? null,
    acePills,
  };
};
