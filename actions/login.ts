"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";


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

  // Sign in
  try {
    
     const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if(result.ok) {
        return {
            success: "User logged in successfully"
        }
    } else {
      return {
        error: "Login ou mot de passe invalide"
      }
    }

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