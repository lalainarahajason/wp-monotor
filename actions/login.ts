"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { 
  generateVerificationToken, 
  generateTwoFactorToken 
} from "@/lib/tokens";
import { 
  sendVerificationEmail, 
  sendTwoFactorTokenEmail 
} from "@/lib/mail";

import { getUserByEmail } from "@/data/user";


// Définir les types pour les résultats possibles de la fonction de connexion
type LoginResult = {
  message?: z.ZodError['errors'];
  error?: string;
  success?: string;
  twoFactor?: boolean
};

/**
 * Gère le processus de connexion de l'utilisateur.
 * 
 * Cette fonction valide les informations de connexion, vérifie l'existence de l'utilisateur,
 * gère la vérification de l'email si nécessaire, et tente de connecter l'utilisateur.
 * 
 * @param values - Les valeurs de connexion fournies par l'utilisateur
 * @returns Une promesse résolvant vers un objet LoginResult
 */
export const Login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResult> => {
  // Valider les champs d'entrée
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors,
      error: "Invalid fields",
    };
  }

  // Récupérer l'email et le mot de passe validés
  const { email, password } = validatedFields.data;

  // Vérifier l'existence de l'utilisateur
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exist!"
    };
  }

  // Vérifier si l'email de l'utilisateur est vérifié
  if (!existingUser.emailVerified) {
    // Générer et envoyer un token de vérification si l'email n'est pas vérifié
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Confirmation email sent"
    };
  }

  if(existingUser.isTwoFactorEnabled && existingUser.email) {
    // Générer et envoyer un token d'authentification à deux facteurs si activé
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    await sendTwoFactorTokenEmail(
      twoFactorToken.email,
      twoFactorToken.token
    );

    return { twoFactor : true }
  }
  
  // Tenter la connexion
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });

    // Si la connexion réussit, la redirection se fera automatiquement
    // Nous n'avons donc pas besoin de retourner quoi que ce soit ici

  } catch (error) {
    // Gérer les erreurs d'authentification
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
    }

    // Si ce n'est pas une AuthError, propager l'erreur
    throw error;
  }

  // Ce retour ne sera jamais atteint en raison de la redirection ou des erreurs gérées,
  // mais TypeScript l'exige pour la cohérence du type de retour
  return {};
};