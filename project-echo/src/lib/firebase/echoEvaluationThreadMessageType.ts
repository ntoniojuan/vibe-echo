export type EchoEvaluationThreadMessage = {
  messageId: string;
  authorUid: string;
  authorDisplayName: string | null;
  text: string;
  createdAt: Date;
};
