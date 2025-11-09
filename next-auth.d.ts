import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** The user's unique identifier (e.g., user ID) */
      id: string;
      email: string;
      image?: string | null;
      username?: string;
      phone?: string | null;
      country?: string | null;
      role?: 'USER' | 'ARTIST';
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    username?: string;
    image?: string | null;
    phone?: string | null;
    country?: string | null;
    role?: 'USER' | 'ARTIST';
  }
}