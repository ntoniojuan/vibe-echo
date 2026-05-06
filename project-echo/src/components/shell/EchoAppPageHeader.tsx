import type { ReactNode } from "react";

export type EchoAppPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  trailing?: ReactNode;
  /** Wizard-style step intros use a divider under the title block. */
  withBottomBorder?: boolean;
  /** Omit default bottom margin (e.g. when nested in a sticky chrome strip). */
  omitOuterMargin?: boolean;
  /** Thin divider under the header row (primary app routes). */
  showBottomDivider?: boolean;
};

export const EchoAppPageHeader = ({
  eyebrow,
  title,
  description,
  trailing,
  withBottomBorder = false,
  omitOuterMargin = false,
  showBottomDivider = false,
}: EchoAppPageHeaderProps) => {
  const baseLayout =
    "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between";
  let layoutClassName = baseLayout;
  if (withBottomBorder) {
    layoutClassName =
      "flex flex-col gap-4 border-b border-outline-variant/40 pb-6 sm:flex-row sm:items-start sm:justify-between";
  } else if (showBottomDivider) {
    layoutClassName =
      "flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between";
  }

  const marginClassName = omitOuterMargin ? "" : "mb-8";

  const titleMarginTopClass = eyebrow !== undefined && eyebrow.length > 0 ? "mt-2" : "";

  return (
    <header className={`${layoutClassName} ${marginClassName}`.trim()}>
      <div className="min-w-0 flex-1">
        {eyebrow !== undefined && eyebrow.length > 0 ? (
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
        ) : null}
        <h1
          className={`text-2xl font-bold tracking-tight text-on-surface sm:text-3xl ${titleMarginTopClass}`}
        >
          {title}
        </h1>
        {description !== undefined && description.length > 0 ? (
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
      {trailing !== undefined ? (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">{trailing}</div>
      ) : null}
    </header>
  );
};
