"use client";

import type { ToastVariant } from "@/contexts/toastContext";

type ToastNoticeProps = {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
};

export const ToastNotice = ({ message, variant, onDismiss }: ToastNoticeProps) => {
  const toneClassName =
    variant === "success"
      ? "bg-primary text-on-primary border-primary-container"
      : "bg-error text-on-error border-error-container";

  return (
    <div
      className={`pointer-events-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm font-medium shadow-[0_8px_30px_rgba(26,32,44,0.12)] ${toneClassName}`}
      role="status"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-full px-2 py-1 text-xs uppercase tracking-wide opacity-80 hover:opacity-100"
      >
        Close
      </button>
    </div>
  );
};
