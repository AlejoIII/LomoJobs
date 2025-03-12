import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: {}, password: {} },
            async authorize(credentials?: { email: string; password: string }) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Credenciales inválidas");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error("Usuario no encontrado");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) throw new Error("Contraseña incorrecta");

                return { id: user.id, email: user.email, role: user.role };
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role, 
                },
            };
        },
    },
    session: { strategy: "jwt" as const },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
