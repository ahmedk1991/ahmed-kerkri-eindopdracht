import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "name@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)  {
                    throw new Error("Email and password are required");
                }

                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email))
                    .then((rows) => rows[0]);

                if (!user) throw new Error("No user found");

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid credentials");

                return {
                    id: user.id.toString(),
                    name: user.username ?? "Unknown",
                    email: user.email ?? "",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.customUser = {
                    id: user.id,
                    name: user.name || "Unknown",
                    email: user.email || "",
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token.customUser) {
                session.user = {
                    id: token.customUser.id,
                    name: token.customUser.name,
                    email: token.customUser.email,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
};

export default NextAuth(authOptions);
