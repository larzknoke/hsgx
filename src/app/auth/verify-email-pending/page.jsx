"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, LogOut } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPendingPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user?.email) {
        setUserEmail(session.data.user.email);
      }
    };
    getSession();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Mail className="h-12 w-12 text-gray-800" />
          </div>
          <CardTitle className="text-2xl text-center">
            E-Mail-Verifizierung erforderlich
          </CardTitle>
          <CardDescription className="text-center">
            Bitte verifizieren Sie Ihre E-Mail-Adresse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-900 text-center text-balance">
              Ihr Konto wurde erstellt, aber Ihre E-Mail-Adresse wurde noch
              nicht verifiziert.
            </p>
            {userEmail && (
              <p className="text-sm text-blue-900 text-center mt-2">
                Wir haben einen Bestätigungslink an <strong>{userEmail}</strong>{" "}
                gesendet.
              </p>
            )}
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Um Ihr Konto vollständig zu aktivieren:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Überprüfen Sie Ihr E-Mail-Postfach</li>
              <li>Klicken Sie auf den Bestätigungslink</li>
              <li>Kehren Sie hierher zurück oder melden Sie sich erneut an</li>
            </ol>
            <p className="text-xs mt-4">
              Haben Sie die E-Mail nicht erhalten? Überprüfen Sie bitte auch
              Ihren Spam-Ordner.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
            disabled={loading}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {loading ? "Wird abgemeldet..." : "Abmelden"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">
              Zurück zur Startseite
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
