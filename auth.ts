import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/utils/db";

export const authOptions: AuthOptions = { 
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        signOut: "/signout"
    },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",    
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                try {
                    const user = await db.user.findUnique({
                        where: { username: credentials.username },
                    });
                    if (!user || !user.password) {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                const myUser = user.email
                    ? await db.user.findUnique({ where: { email: user.email } })
                    : null;
                token.username = myUser?.username;
                token.phone = myUser?.phone;
                token.image = myUser?.image;
                token.country = myUser?.country;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string;
                session.user.image = token.image as string | null | undefined;
                session.user.phone = token.phone as string | null | undefined;
                session.user.country = token.country as string | null | undefined;
            }
            return session;
        },
    },
    secret: process.env.NAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions); // Use authOptions

export const { auth, signIn, signOut } = handler;
export { handler as GET, handler as POST };
