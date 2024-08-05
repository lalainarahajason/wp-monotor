import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})