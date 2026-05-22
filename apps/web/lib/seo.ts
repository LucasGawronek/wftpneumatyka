import type { CatalogProduct } from "@/types/catalog";
import type { Locale } from "@/lib/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wft-pneumatyka.pl";

const localeLanguageTags: Record<Locale, string> = {
  pl: "pl-PL",
  de: "de-DE",
  en: "en-GB",
};

const openGraphLocaleMap: Record<Locale, string> = {
  pl: "pl_PL",
  de: "de_DE",
  en: "en_GB",
};

export function getSiteUrl() {
  return siteUrl;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function localizedAbsoluteUrl(locale: Locale, path = "") {
  const normalizedPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  return absoluteUrl(`/${locale}${normalizedPath}`);
}

export function getLocaleLanguageTag(locale: Locale) {
  return localeLanguageTags[locale];
}

export function getOpenGraphLocale(locale: Locale) {
  return openGraphLocaleMap[locale];
}

export function buildLanguageAlternates(path = "") {
  return {
    "x-default": absoluteUrl(`/pl${path}`),
    "pl-PL": absoluteUrl(`/pl${path}`),
    "de-DE": absoluteUrl(`/de${path}`),
    "en-GB": absoluteUrl(`/en${path}`),
  };
}

export function buildLocaleAlternates(locale: Locale, path = "") {
  return {
    canonical: localizedAbsoluteUrl(locale, path),
    languages: buildLanguageAlternates(path),
  };
}

export function buildPageTitle(title: string) {
  return `${title} | WFT Pneumatyka`;
}

export function trimDescription(value: string, maxLength = 160) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "WFT Pneumatyka",
    url: absoluteUrl("/"),
    image: absoluteUrl("/wft/hero_new.png"),
    logo: absoluteUrl("/favicon.jpg"),
    email: "biuro@wft-pneumatyka.pl",
    telephone: "+48663226683",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Dluga 23",
      postalCode: "64-000",
      addressLocality: "Sierakowo",
      addressCountry: "PL",
    },
    areaServed: "PL",
    sameAs: [
      "https://www.facebook.com/wft.pneumatyka",
      "https://www.instagram.com/truck_pneumatic_system?igsh=a2E4Zzhoa2JsbHph",
    ],
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WFT Pneumatyka",
    url: localizedAbsoluteUrl(locale),
    inLanguage: getLocaleLanguageTag(locale),
  };
}

export function buildProductJsonLd(product: CatalogProduct, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.partNumber,
    mpn: product.partNumber,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    category: product.category?.name,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: trimDescription(
      product.shortDescription || product.description || product.name,
      300,
    ),
    url: localizedAbsoluteUrl(locale, `/produkt/${product.slug}`),
  };
}
