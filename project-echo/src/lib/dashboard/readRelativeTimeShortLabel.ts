export const readRelativeTimeShortLabel = (date: Date): string => {
  const deltaMs = Date.now() - date.getTime();
  const absSec = Math.floor(Math.abs(deltaMs) / 1000);
  if (absSec < 60) {
    return "just now";
  }
  const absMin = Math.floor(absSec / 60);
  if (absMin < 60) {
    return `${String(absMin)}m ago`;
  }
  const absHr = Math.floor(absMin / 60);
  if (absHr < 48) {
    return `${String(absHr)}h ago`;
  }
  const absDay = Math.floor(absHr / 24);
  if (absDay < 14) {
    return `${String(absDay)}d ago`;
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};
