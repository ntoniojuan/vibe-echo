"use client";

import { useContext } from "react";
import { ToastContext } from "@/contexts/toastContext";

export const useToast = () => {
  const toastContextValue = useContext(ToastContext);
  if (!toastContextValue) {
    throw new Error("useToast must be used within ToastProvider.");
  }
  return toastContextValue;
};
