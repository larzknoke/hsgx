"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { registerUser } from "@/app/api/auth/actions/register";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
      name: formData.get("name"),
    };

    // Client-side validation
    const newErrors = {};

    if (!data.email) newErrors.email = "E-Mail ist erforderlich";
    if (!data.password) newErrors.password = "Passwort ist erforderlich";
    if (data.password !== data.passwordConfirm) {
      newErrors.passwordConfirm = "Passwörter stimmen nicht überein";
    }
    if (!data.name) newErrors.name = "Name ist erforderlich";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    startTransition(async () => {
      try {
        const result = await registerUser(data);

        if (result.success) {
          toast.success(result.message);
          // Redirect to login page
          setTimeout(() => router.push("/auth/signin"), 1500);
        } else {
          toast.error(result.error);
          setErrors({ submit: result.error });
        }
      } catch (error) {
        toast.error("Ein Fehler ist aufgetreten");
        console.error("Registration error:", error);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Registrieren</h1>
          <p className="text-gray-600">
            Erstellen Sie ein neues Konto, um zu beginnen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Max Mustermann"
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="max@example.com"
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mindestens 8 Zeichen"
              disabled={isPending}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Passwort bestätigen</Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Passwort wiederholen"
              disabled={isPending}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
              {errors.submit}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant="success"
          >
            {isPending ? "Wird registriert..." : "Registrieren"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Bereits registriert?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
              Anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
