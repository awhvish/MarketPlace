import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { signOut } from "next-auth/react";
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NAUTH_SECRET });

    console.log("Token:", token);
    console.log("Requested URL:", req.nextUrl.pathname);

    if (token && req.nextUrl.pathname === '/auth/login') {

      return NextResponse.redirect(new URL(`/`, req.url));

    }
    if (!token && req.nextUrl.pathname.startsWith('/user/profile/') && req.nextUrl.pathname.endsWith('/edit')) {
      return NextResponse.redirect(new URL(`/unauthorized`, req.url));
    }

    return NextResponse.next();
}

export const config = { matcher: ["/auth/login", "/user/profile/:path*/edit"] };