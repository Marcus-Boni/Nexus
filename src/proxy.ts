import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard", "/projects", "/workspace", "/graph"];

export const proxy = auth((req) => {
  const isProtected = protectedPrefixes.some((p) =>
    req.nextUrl.pathname.startsWith(p),
  );

  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
