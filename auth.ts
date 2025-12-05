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
                    return {
                        ...user,
                        role: user.role as 'USER' | 'ARTIST'
                    };
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 90 * 24 * 60 * 60, // 90 days
        updateAge: 24 * 60 * 60, // Update every 24 hours
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
                token.role = myUser?.role as 'USER' | 'ARTIST';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.username = (token.username as string) || undefined;
                session.user.image = (token.image as string) || null;
                session.user.phone = (token.phone as string) || null;
                session.user.country = (token.country as string) || null;
                session.user.role = (token.role as 'USER' | 'ARTIST') || 'USER';
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
