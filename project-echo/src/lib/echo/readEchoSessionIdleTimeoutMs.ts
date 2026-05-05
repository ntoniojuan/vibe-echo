/**
 * IT.06.POL: idle session length before forced sign-out (default 60 minutes).
 * Set ECHO_SESSION_IDLE_TIMEOUT_MS for tests (e.g. 120000 for 2 minutes).
 */
export const readEchoSessionIdleTimeoutMs = (): number => {
  const raw = process.env.NEXT_PUBLIC_ECHO_SESSION_IDLE_TIMEOUT_MS?.trim();
  if (!raw) {
    return 60 * 60 * 1000;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 60_000) {
    return 60 * 60 * 1000;
  }
  return Math.min(parsed, 24 * 60 * 60 * 1000);
};
