import { Suspense } from "react";
import { EchoWizard } from "@/components/echo/EchoWizard";

export default function EvaluationPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-10 text-center text-sm text-on-surface-variant sm:px-6">
          Loading evaluation…
        </div>
      }
    >
      <EchoWizard />
    </Suspense>
  );
}
