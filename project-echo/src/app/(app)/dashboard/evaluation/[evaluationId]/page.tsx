import { EchoEvaluationDetailShell } from "@/components/evaluation/EchoEvaluationDetailShell";

type EchoEvaluationDetailPageProps = {
  params: Promise<{ evaluationId: string }>;
};

export default async function EchoEvaluationDetailPage({
  params,
}: EchoEvaluationDetailPageProps) {
  const { evaluationId } = await params;
  return <EchoEvaluationDetailShell evaluationId={evaluationId} />;
}
