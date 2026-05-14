import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale, localizedPath, locales, type Locale } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of preferredLanguages) {
    const directMatch = locales.find((locale) => locale === language);

    if (directMatch) {
      return directMatch;
    }

    const baseLanguage = language.split("-")[0];
    const baseMatch = locales.find((locale) => locale === baseLanguage);

    if (baseMatch) {
      return baseMatch;
    }
  }

  return defaultLocale;
}

function withLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/wft") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isLocale(firstSegment)) {
    return withLocaleCookie(NextResponse.next(), firstSegment);
  }

  const preferredLocale = getPreferredLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = localizedPath(preferredLocale, pathname);
  redirectUrl.search = search;

  return withLocaleCookie(NextResponse.redirect(redirectUrl), preferredLocale);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
