"use client";

import { SessionProvider } from "next-auth/react";

// Wrap client components that need access to useSession / signIn / signOut.
// Keep this small to avoid unnecessary re-renders on session changes.
export default function SessionAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
