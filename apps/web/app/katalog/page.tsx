import { redirect } from "next/navigation";
import { catalogPath, defaultLocale } from "@/lib/i18n";

type CatalogPageProps = {
  searchParams: Promise<{
    category?: string;
    brand?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category, brand } = await searchParams;
  const path = catalogPath(defaultLocale, { category, brand });

  redirect(path);
}
