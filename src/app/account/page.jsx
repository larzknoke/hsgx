"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isPending) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Kontoeinstellungen</CardTitle>
          <CardDescription>
            Verwalten Sie Ihre Kontoinformationen und Einstellungen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || "User"}
              />
              <AvatarFallback className="text-2xl">
                {getUserInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold">{session.user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
              {session.user.emailVerified && (
                <p className="text-xs text-green-600">✓ E-Mail verifiziert</p>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Sitzungsinformationen</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Benutzer-ID:</span>
                <span className="font-mono">{session.user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sitzungs-ID:</span>
                <span className="font-mono text-xs">{session.session.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Erstellt:</span>
                <span>
                  {new Date(session.user.createdAt).toLocaleDateString("de-DE")}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end">
            <Button variant="destructive" onClick={handleLogout}>
              Abmelden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
