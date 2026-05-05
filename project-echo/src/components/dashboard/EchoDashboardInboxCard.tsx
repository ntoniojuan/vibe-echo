"use client";

type AcePill = {
  shortLabel: string;
  description: string;
  filled: boolean;
};

type EchoDashboardInboxCardProps = {
  title: string;
  snippet: string;
  relativeTimeLabel: string;
  fromLine: string;
  badgeLabel: string | null;
  badgeClassName: string | null;
  acePills: readonly AcePill[];
  primaryActionLabel: string | null;
  onPrimaryAction: (() => void) | null;
  showUnreadIndicator?: boolean;
};

export const EchoDashboardInboxCard = ({
  title,
  snippet,
  relativeTimeLabel,
  fromLine,
  badgeLabel,
  badgeClassName,
  acePills,
  primaryActionLabel,
  onPrimaryAction,
  showUnreadIndicator = false,
}: EchoDashboardInboxCardProps) => {
  const showPrimary = primaryActionLabel !== null && onPrimaryAction !== null;

  return (
    <article className="rounded-2xl border border-outline-variant/35 bg-echo-card p-5 shadow-[var(--shadow-echo-card)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {badgeLabel !== null && badgeClassName !== null ? (
            <span
              className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClassName}`}
            >
              {badgeLabel}
            </span>
          ) : null}
          <h3 className="min-w-0 text-base font-bold text-on-surface">
            {title}
            {showUnreadIndicator ? (
              <span
                className="ml-1.5 inline-block h-2 w-2 rounded-full bg-primary align-middle"
                aria-label="Unread"
              />
            ) : null}
          </h3>
        </div>
        <span className="shrink-0 text-xs font-medium text-on-surface-variant">
          {relativeTimeLabel}
        </span>
      </div>
      <p className="mt-2 text-xs text-on-surface-variant">{fromLine}</p>
      <p className="mt-3 text-sm leading-relaxed text-on-surface">{snippet}</p>
      <div className="mt-4 border-t border-outline-variant/25 pt-4">
        <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-2">
          <div className="flex flex-wrap gap-2" aria-label="ACE pillars">
            {acePills.map((pill) => (
              <span
                key={pill.shortLabel}
                title={pill.description}
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  pill.filled
                    ? "border-primary/40 bg-primary/10 text-on-surface"
                    : "border-outline-variant/40 bg-surface-container-lowest/80 text-on-surface-variant opacity-70"
                }`}
              >
                {pill.shortLabel}
              </span>
            ))}
          </div>
          {showPrimary ? (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="shrink-0 self-end rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-on-primary shadow-sm hover:opacity-90 min-[480px]:self-center"
            >
              {primaryActionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};
