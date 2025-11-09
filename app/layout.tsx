import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import AuthProvider from "@/components/Providers/AuthProvider";
import dynamic from "next/dynamic";

const AIChatMascot = dynamic(() => import("@/components/Chat/AIChatMascot").then(mod => mod.AIChatMascot), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "MarketPlace",
  description: "Online Bidding System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const username = session?.user?.username ?? null;

  return (
    <html lang="en">
      <body className={``}>
        <AuthProvider>
          {/* Expose current user id/client for lightweight components */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.CURRENT_USER_ID = ${userId ? JSON.stringify(userId) : "null"}; window.CURRENT_USER_USERNAME = ${username ? JSON.stringify(username) : "null"};`,
            }}
          />
          {children}
          {/* AI Chat Mascot */}
          {session && <AIChatMascot />}
        </AuthProvider>
      </body>
    </html>
  );
}
