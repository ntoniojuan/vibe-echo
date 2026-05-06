import { Suspense } from "react";
import { EchoWizard } from "@/components/echo/EchoWizard";

export default function EvaluationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-sm text-on-surface-variant">
          Loading evaluation…
        </div>
      }
    >
      <EchoWizard />
    </Suspense>
  );
}
