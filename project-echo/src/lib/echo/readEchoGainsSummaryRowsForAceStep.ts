import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import type { EchoGainsSummaryRow } from "@/lib/echo/echoGainsSummaryRowType";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsSubcompetencyRowsForAceStep } from "@/lib/echo/readEchoGainsSubcompetencyRowsForAceStep";
import { readGainsLevelFullLabel } from "@/lib/echo/readGainsLevelFullLabel";

export const readEchoGainsSummaryRowsForAceStep = (
  formState: EchoWizardFormState,
  aceStep: EchoAceStepKey,
): ReadonlyArray<EchoGainsSummaryRow> =>
  readEchoGainsSubcompetencyRowsForAceStep(aceStep).map((row) => {
    const level = formState.gainsRatings[row.code];
    const ratingLabel =
      level !== undefined ? readGainsLevelFullLabel(level) : "Not rated";
    return { code: row.code, title: row.title, ratingLabel };
  });
