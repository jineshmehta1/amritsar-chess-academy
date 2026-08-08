import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";
import { decryptSessionToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  let session = null;
  if (sessionCookie) {
    session = await decryptSessionToken(sessionCookie);
  }

  // Redirect authenticated users away from login page
  if (pathname.startsWith("/login")) {
    if (session) {
      if (session.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (session.role === "STUDENT") {
        return NextResponse.redirect(new URL("/student", request.url));
      }
    }
    return NextResponse.next();
  }

  // Protect Admin dashboard
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Delete invalid session cookie
      response.cookies.delete("session");
      return response;
    }
    return NextResponse.next();
  }

  // Protect Student portal
  if (pathname.startsWith("/student")) {
    if (!session || session.role !== "STUDENT") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Delete invalid session cookie
      response.cookies.delete("session");
      return response;
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/login"],
};
