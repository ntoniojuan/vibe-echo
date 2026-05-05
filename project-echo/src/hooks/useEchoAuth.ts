"use client";

import { useContext } from "react";
import { EchoAuthContext } from "@/contexts/echoAuthContext";

export const useEchoAuth = () => {
  const value = useContext(EchoAuthContext);
  if (!value) {
    throw new Error("useEchoAuth must be used within EchoAuthProvider.");
  }
  return value;
};
