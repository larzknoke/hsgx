"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import sha256 from "crypto-js/sha256";

const registerSchema = z.object({
  email: z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  name: z.string().min(1, "Name ist erforderlich"),
});

const hashPassword = (password) => {
  return sha256(password).toString();
};

export async function registerUser(formData) {
  try {
    // Validate input
    const validated = registerSchema.parse({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Ein Benutzer mit dieser E-Mail-Adresse existiert bereits",
      };
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        password: hashPassword(validated.password),
        name: validated.name,
      },
    });

    return {
      success: true,
      message: "Registrierung erfolgreich! Sie können sich jetzt anmelden.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    console.error("Registration error:", error);
    return {
      success: false,
      error: "Ein Fehler ist bei der Registrierung aufgetreten",
    };
  }
}
