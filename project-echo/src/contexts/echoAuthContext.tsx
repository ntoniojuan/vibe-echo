"use client";

import { createContext } from "react";
import type { EchoAuthContextValue } from "@/lib/echo/echoAuthContextValueType";

export const EchoAuthContext = createContext<EchoAuthContextValue | null>(null);
