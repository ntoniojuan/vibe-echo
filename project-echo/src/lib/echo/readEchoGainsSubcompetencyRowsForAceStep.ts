import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";

export const readEchoGainsSubcompetencyRowsForAceStep = (
  aceStep: EchoAceStepKey,
) => echoGainsSubcompetencyCatalog.filter((row) => row.aceStep === aceStep);
