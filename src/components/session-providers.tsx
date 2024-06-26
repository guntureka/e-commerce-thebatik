"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface SessionProvidersProps {
  children: React.ReactNode;
}

const SessionProviders = ({ children }: SessionProvidersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
