import deMessages from "@/messages/de";
import enMessages from "@/messages/en";
import plMessages from "@/messages/pl";

export const locales = ["pl", "de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

const messages = {
  pl: plMessages,
  de: deMessages,
  en: enMessages,
} as const;

export type AppMessages = (typeof messages)[Locale];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function localizedPath(locale: Locale, path = "") {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function catalogPath(
  locale: Locale,
  filters?: {
    category?: string;
    brand?: string;
  },
) {
  const base = localizedPath(locale, "/katalog");

  if (!filters?.category && !filters?.brand) {
    return base;
  }

  const params = new URLSearchParams();

  if (filters.category) {
    params.set("category", filters.category);
  }

  if (filters.brand) {
    params.set("brand", filters.brand);
  }

  return `${base}?${params.toString()}`;
}

export function categoryPath(locale: Locale, slug: string) {
  return catalogPath(locale, { category: slug });
}

export function productPath(locale: Locale, slug: string) {
  return localizedPath(locale, `/produkt/${slug}`);
}

export function quotePath(locale: Locale, productSlug?: string) {
  const base = localizedPath(locale, "/wycena");

  if (!productSlug) {
    return base;
  }

  return `${base}?product=${encodeURIComponent(productSlug)}`;
}

export function contactPath(locale: Locale) {
  return localizedPath(locale, "/kontakt");
}

export function removeLocalePrefix(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (isLocale(segments[0])) {
    const nextPath = segments.slice(1).join("/");
    return nextPath ? `/${nextPath}` : "/";
  }

  return pathname;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return localizedPath(locale, removeLocalePrefix(pathname));
}
