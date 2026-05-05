import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";

export type EchoGainsSubcompetencyRow = {
  code: GainsSubcompetencyCode;
  aceStep: EchoAceStepKey;
  title: string;
  description: string;
};
