import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** The user's unique identifier (e.g., user ID) */
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string; 
      phone?: string | null;
      country?: string | null;
    };
  }
}