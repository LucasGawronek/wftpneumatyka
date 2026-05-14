import { redirect } from "next/navigation";
import { defaultLocale, productPath } from "@/lib/i18n";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  redirect(productPath(defaultLocale, slug));
}
