import { redirect } from "next/navigation";
import { categoryPath, defaultLocale } from "@/lib/i18n";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  redirect(categoryPath(defaultLocale, slug));
}
