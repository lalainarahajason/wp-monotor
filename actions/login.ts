"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors,
      error: "Invalid fields",
    };
  }

  // Récupérer l'email et le mot de passe
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exists!"
    }
  }

  if(!existingUser.emailVerified) {
    const verificationToken = generateVerificationToken(existingUser.email)

    return {
      success: "Confirmation email sent"
    }
  }
  
  // Sign in
  try {

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });



  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Identifiant ou mot de passe invalide",
          };
        default:
          return {
            error: "Une erreur est survenue, veuillez réessayer",
          };
      }

      throw error;
    }
  }
};
