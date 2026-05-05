import { echoWizardDraftStorageKey } from "@/lib/echo/echoWizardDraftStorageKey";

/**
 * Curated keys to remove on logout / IT.06.POL idle timeout (avoid full localStorage.clear()).
 */
export const readEchoClientStorageKeysToClearOnLogout = (): string[] => [echoWizardDraftStorageKey];
