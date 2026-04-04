import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { isValidLocale } from "@/i18n/messages";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth";

const handleI18nRouting = createMiddleware(routing);
const protectedPrefixes = ["/dashboard", "/projects", "/workspace", "/graph"];

function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];

  return segment && isValidLocale(segment) ? segment : routing.defaultLocale;
}

function getPathnameWithoutLocale(pathname: string) {
  const [, maybeLocale, ...segments] = pathname.split("/");

  if (maybeLocale && isValidLocale(maybeLocale)) {
    return segments.length > 0 ? `/${segments.join("/")}` : "/";
  }

  return pathname;
}

function getLocalizedLoginPath(locale: (typeof routing.locales)[number]) {
  return locale === routing.defaultLocale ? "/login" : `/${locale}/login`;
}

export const proxy = auth((req) => {
  const pathname = getPathnameWithoutLocale(req.nextUrl.pathname);
  const locale = getLocaleFromPathname(req.nextUrl.pathname);
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!req.auth && isProtected) {
    return NextResponse.redirect(
      new URL(getLocalizedLoginPath(locale), req.url),
    );
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
