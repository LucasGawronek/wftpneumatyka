import { NextResponse } from "next/server";
import { defaultLocale, getMessages, isLocale } from "@/lib/i18n";
import { searchProducts } from "@/lib/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const localeParam = searchParams.get("locale") ?? defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  if (query.trim().length < 3) {
    return NextResponse.json({ items: [] });
  }

  try {
    const items = await searchProducts(query, locale, 6);

    return NextResponse.json({
      items: items.map((product) => ({
        documentId: product.documentId,
        name: product.name,
        slug: product.slug,
        partNumber: product.partNumber,
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: product.category,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : getMessages(locale).search.fetchError;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
