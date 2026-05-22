import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { locales, type Locale } from "@/lib/i18n";
import { buildLanguageAlternates, localizedAbsoluteUrl } from "@/lib/seo";

const staticPaths = [
  "",
  "/katalog",
  "/o-nas",
  "/uslugi",
  "/kontakt",
  "/wycena",
  "/polityka-prywatnosci",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: localizedAbsoluteUrl(locale, path),
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/katalog" ? 0.9 : 0.7,
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    })),
  );

  const productEntries = await Promise.all(
    locales.map(async (locale) => {
      const products = await getProducts({ locale });

      return products.map((product) => ({
        url: localizedAbsoluteUrl(locale as Locale, `/produkt/${product.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: buildLanguageAlternates(`/produkt/${product.slug}`),
        },
      }));
    }),
  );

  return [...staticEntries, ...productEntries.flat()];
}
