"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthBtns() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="text-sm text-muted-foreground">Prüfe Anmeldung…</div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm">
          Angemeldet als {session.user?.email || session.user?.name}
        </span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Abmelden
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm">Nicht angemeldet</span>
      <button
        onClick={() => signIn("credentials")}
        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
      >
        Anmelden
      </button>
    </div>
  );
}
