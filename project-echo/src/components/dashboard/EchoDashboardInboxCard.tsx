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
  fromLineUsePlaceholderStyle?: boolean;
  snippetUsePlaceholderStyle?: boolean;
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
  fromLineUsePlaceholderStyle = false,
  snippetUsePlaceholderStyle = false,
  badgeLabel,
  badgeClassName,
  acePills,
  primaryActionLabel,
  onPrimaryAction,
  showUnreadIndicator = false,
}: EchoDashboardInboxCardProps) => {
  const showPrimary = primaryActionLabel !== null && onPrimaryAction !== null;

  return (
    <article className="rounded-xl border border-slate-200 bg-echo-elevated-card p-5 shadow-sm dark:border-slate-600/40 dark:bg-[#1E293B] dark:text-slate-100">
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
      <p
        className={`mt-2 text-xs ${fromLineUsePlaceholderStyle ? "italic text-on-surface-variant/90" : "text-on-surface-variant"}`}
      >
        {fromLine}
      </p>
      <p
        className={`mt-3 text-sm leading-relaxed ${snippetUsePlaceholderStyle ? "italic text-on-surface-variant" : "text-on-surface"}`}
      >
        {snippet}
      </p>
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
              className="shrink-0 self-end rounded-full bg-[#4A634A] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#D1DCD1] hover:text-slate-900 min-[480px]:self-center"
            >
              {primaryActionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};
