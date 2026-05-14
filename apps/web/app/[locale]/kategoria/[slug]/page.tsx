import { redirect } from "next/navigation";
import { categoryPath, type Locale } from "@/lib/i18n";

type LocalizedCategoryPageProps = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export default async function LocalizedCategoryPage({ params }: LocalizedCategoryPageProps) {
  const { locale, slug } = await params;
  redirect(categoryPath(locale, slug));
}
