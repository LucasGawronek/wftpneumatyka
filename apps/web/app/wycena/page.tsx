import { redirect } from "next/navigation";
import { defaultLocale, quotePath } from "@/lib/i18n";

type QuotePageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { product } = await searchParams;
  redirect(quotePath(defaultLocale, product));
}
