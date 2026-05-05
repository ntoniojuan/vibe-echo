"use client";

import { Info } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type EchoAboutEchoPopoverProps = {
  variant: "sidebar" | "surface";
  className?: string;
};

const popoverPanelMaxWidthPx = 320;

export const EchoAboutEchoPopover = ({ variant, className }: EchoAboutEchoPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonReference = useRef<HTMLButtonElement>(null);
  const panelReference = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const panelDomId = `echo-about-panel-${reactId}`;
  const titleDomId = `echo-about-title-${reactId}`;

  const updatePanelPosition = useCallback(() => {
    const buttonElement = buttonReference.current;
    if (!buttonElement) {
      return;
    }
    const rect = buttonElement.getBoundingClientRect();
    const preferredLeft = rect.left;
    const clampedLeft = Math.max(
      8,
      Math.min(preferredLeft, window.innerWidth - popoverPanelMaxWidthPx - 16),
    );
    setPanelPosition({
      top: rect.bottom + 8,
      left: clampedLeft,
    });
  }, []);

  const closePopover = useCallback(() => {
    setOpen(false);
    setPanelPosition(null);
    window.requestAnimationFrame(() => {
      buttonReference.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    updatePanelPosition();

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelReference.current?.contains(target)) {
        return;
      }
      if (buttonReference.current?.contains(target)) {
        return;
      }
      closePopover();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, closePopover, updatePanelPosition]);

  useEffect(() => {
    if (!open) {
      return;
    }
    panelReference.current?.focus();
  }, [open]);

  const onToggle = () => {
    if (open) {
      closePopover();
      return;
    }
    updatePanelPosition();
    setOpen(true);
  };

  const buttonClassName =
    variant === "sidebar"
      ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-echo-sidebar-muted transition-colors hover:bg-white/10 hover:text-echo-sidebar-fg"
      : "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-outline-variant/40 bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-high";

  const panelClassName =
    variant === "sidebar"
      ? "max-h-[min(70vh,420px)] w-[min(92vw,320px)] overflow-y-auto rounded-xl border border-white/20 bg-[#0f172a] p-4 text-left text-sm text-slate-100 shadow-xl shadow-black/40"
      : "max-h-[min(70vh,420px)] w-[min(92vw,320px)] overflow-y-auto rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-4 text-left text-sm text-on-surface shadow-xl";

  const listClassName = variant === "sidebar" ? "text-slate-200/95" : "text-on-surface-variant";

  const portalContent =
    open && panelPosition !== null && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={panelReference}
            id={panelDomId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleDomId}
            tabIndex={-1}
            className={`fixed z-[200] ${panelClassName}`}
            style={{
              top: panelPosition.top,
              left: panelPosition.left,
            }}
          >
            <h2 id={titleDomId} className="sr-only">
              About ECHO
            </h2>
            <ul className={`space-y-3 leading-snug ${listClassName}`}>
              <li>
                <span className="font-semibold text-inherit">ECHO:</span> Evaluation of Capabilities
                &amp; Holistic Objectives.
              </li>
              <li>
                <span className="font-semibold text-inherit">The ACE Framework:</span> Aptitude
                (Head), Character (Heart), and Effectiveness (Hands).
              </li>
              <li>
                <span className="font-semibold text-inherit">The Goal:</span> To foster proactive,
                integrated, and holistic healthcare through professional development.
              </li>
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={buttonReference}
        type="button"
        onClick={onToggle}
        className={`${buttonClassName} ${className ?? ""}`.trim()}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelDomId : undefined}
        aria-label="About ECHO"
      >
        <Info className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>
      {portalContent}
    </>
  );
};
