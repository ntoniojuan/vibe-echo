import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";

type EchoAceStepPillarIconProps = {
  aceKey: EchoAceStepKey;
  className?: string;
};

export const EchoAceStepPillarIcon = ({ aceKey, className }: EchoAceStepPillarIconProps) => {
  const baseClass = className ?? "h-7 w-7 text-on-primary-container";
  if (aceKey === "aptitude") {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
      </svg>
    );
  }
  if (aceKey === "character") {
    return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className={baseClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
  );
};
