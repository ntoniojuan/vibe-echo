import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";

export const readEchoAreAllGainsRatingsComplete = (formState: EchoWizardFormState): boolean =>
  echoGainsSubcompetencyCatalog.every((row) => formState.gainsRatings[row.code] !== undefined);
