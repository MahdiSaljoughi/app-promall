import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const requestPath = req.nextUrl.pathname;
  const userRole = token?.role;

  if (requestPath === "/auth") {
    if (token) {
      return NextResponse.redirect(new URL("/profile", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (requestPath.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
  }

  if (requestPath.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    if (userRole !== "CUSTOMER") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*", "/profile/:path*"],
};
