import type { EchoEvaluationThreadMessage } from "@/lib/firebase/echoEvaluationThreadMessageType";

const readTimestampAsDate = (value: unknown, fallback: Date): Date => {
  if (value instanceof Date) {
    return value;
  }
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }
  return fallback;
};

export const readEchoEvaluationThreadMessageFromDoc = (
  messageId: string,
  data: Record<string, unknown>,
): EchoEvaluationThreadMessage => {
  const authorDisplayNameRaw = data.authorDisplayName;
  const authorDisplayName =
    typeof authorDisplayNameRaw === "string" && authorDisplayNameRaw.trim().length > 0
      ? authorDisplayNameRaw.trim()
      : null;

  return {
    messageId,
    authorUid: typeof data.authorUid === "string" ? data.authorUid : "",
    authorDisplayName,
    text: typeof data.text === "string" ? data.text : "",
    createdAt: readTimestampAsDate(data.createdAt, new Date(0)),
  };
};
