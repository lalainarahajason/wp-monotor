import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers : [Credentials({
        async authorize(credentials) {
            const validateFields = LoginSchema.safeParse(credentials);

            if(validateFields.success) {
                const { email, password } = validateFields.data;
                const user = await getUserByEmail(email);

                /**
                 * If user does not exists or user used google or github
                 * to create a account
                 */
                if(!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(password, user.password)

                if(passwordMatch) return user;
            }

            return null;
        }
    })],
} satisfies NextAuthConfig