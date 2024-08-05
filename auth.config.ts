import GitHub from "next-auth/providers/GitHub";
import type { NextAuthConfig } from "next-auth";

export default {
    providers : [GitHub],
} satisfies NextAuthConfig