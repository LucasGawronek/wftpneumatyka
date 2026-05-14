import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import {
  catalogPath,
  getMessages,
  type Locale,
} from "@/lib/i18n";
import {
  countProductsForCategoryBranch,
  getCategories,
  getChildCategories,
  getProducts,
  getTopLevelCategories,
} from "@/lib/catalog";

function getFilteringMessage(locale: Locale, category?: string | null, brand?: string | null) {
  if (locale === "pl") {
    if (category && brand) {
      return `Filtrujesz produkty z kategorii ${category} dla producenta ${brand}.`;
    }

    if (category) {
      return `Filtrujesz produkty z kategorii ${category}.`;
    }

    if (brand) {
      return `Filtrujesz produkty producenta ${brand}.`;
    }

    return null;
  }

  if (locale === "de") {
    if (category && brand) {
      return `Sie filtern Produkte aus der Kategorie ${category} f\u00fcr den Hersteller ${brand}.`;
    }

    if (category) {
      return `Sie filtern Produkte aus der Kategorie ${category}.`;
    }

    if (brand) {
      return `Sie filtern Produkte des Herstellers ${brand}.`;
    }

    return null;
  }

  if (category && brand) {
    return `You are filtering ${category} products for the ${brand} brand.`;
  }

  if (category) {
    return `You are filtering products from the ${category} category.`;
  }

  if (brand) {
    return `You are filtering products for the ${brand} brand.`;
  }

  return null;
}

function getEmptyStateCopy(locale: Locale) {
  if (locale === "pl") {
    return {
      title: "Brak produkt\u00f3w dla wybranego filtra",
      description: "Dodaj pierwsze pozycje w Strapi albo zmie\u0144 kategori\u0119 lub producenta w katalogu.",
    };
  }

  if (locale === "de") {
    return {
      title: "Keine Produkte f\u00fcr den gew\u00e4hlten Filter",
      description:
        "F\u00fcgen Sie die ersten Positionen in Strapi hinzu oder \u00e4ndern Sie Kategorie oder Hersteller im Katalog.",
    };
  }

  return {
    title: "No products for the selected filter",
    description: "Add the first items in Strapi or change the category or brand in the catalog.",
  };
}

type CatalogPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    category?: string;
    brand?: string;
  }>;
};

export default async function LocalizedCatalogPage({ params, searchParams }: CatalogPageProps) {
  const [{ locale }, { category, brand }] = await Promise.all([params, searchParams]);
  const messages = getMessages(locale);

  const [categories, allProducts, brandScopedProducts, filteredProducts] = await Promise.all([
    getCategories(locale),
    getProducts({ locale }),
    brand ? getProducts({ brand, locale }) : Promise.resolve(null),
    category || brand
      ? getProducts({ categorySlug: category, brand, locale })
      : Promise.resolve(null),
  ]);

  const products = filteredProducts ?? allProducts;
  const sidebarProducts = brandScopedProducts ?? allProducts;
  const topLevelCategories = getTopLevelCategories(categories);
  const activeCategory = category ? categories.find((item) => item.slug === category) : null;
  const activeTitle =
    [activeCategory?.name, brand].filter((value): value is string => Boolean(value)).join(" / ") ||
    messages.common.allProducts;
  const filteringMessage = getFilteringMessage(locale, activeCategory?.name, brand);
  const emptyStateCopy = getEmptyStateCopy(locale);

  return (
    <div className="bg-[var(--wft-body)] py-8 md:py-12">
      <div className="wft-container flex flex-col gap-8">
        <section className="grid gap-8 lg:grid-cols-[270px_1fr] xl:grid-cols-[290px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="overflow-hidden rounded-[24px] border border-[var(--wft-orange)] bg-white shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
              <div className="bg-[var(--wft-orange)] px-6 py-4 text-[15px] font-extrabold uppercase text-white">
                {messages.common.categories}
              </div>
              <div className="space-y-6 px-6 py-8">
                <Link
                  href={catalogPath(locale, brand ? { brand } : undefined)}
                  className={`flex items-center justify-between gap-4 text-[17px] font-medium transition ${
                    !category
                      ? "text-[var(--wft-orange)]"
                      : "text-[var(--wft-dark)] hover:text-[var(--wft-orange)]"
                  }`}
                >
                  <span>{messages.common.allProducts}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[14px] ${
                      !category
                        ? "bg-[var(--wft-orange)] text-white"
                        : "bg-[#f3f3f3] text-[#555]"
                    }`}
                  >
                    {sidebarProducts.length}
                  </span>
                </Link>
                {topLevelCategories.map((item) => {
                  const count = countProductsForCategoryBranch(categories, sidebarProducts, item.slug);

                  return (
                    <div key={item.documentId} className="space-y-3">
                      <Link
                        href={catalogPath(locale, { category: item.slug, brand })}
                        className={`flex items-center justify-between gap-4 text-[17px] font-medium transition ${
                          category === item.slug
                            ? "text-[var(--wft-orange)]"
                            : "text-[var(--wft-dark)] hover:text-[var(--wft-orange)]"
                        }`}
                      >
                        <span className="pr-4">{item.name}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-[14px] ${
                            category === item.slug
                              ? "bg-[var(--wft-orange)] text-white"
                              : "bg-[#f3f3f3] text-[#555]"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                      {getChildCategories(categories, item.slug).map((child) => (
                        <Link
                          key={child.documentId}
                          href={catalogPath(locale, { category: child.slug, brand })}
                          className={`flex items-center justify-between gap-4 pl-4 text-[15px] transition ${
                            category === child.slug
                              ? "text-[var(--wft-orange)]"
                              : "text-[#666] hover:text-[var(--wft-orange)]"
                          }`}
                        >
                          <span className="pr-4">{child.name}</span>
                          <span
                            className={`rounded-full px-3 py-1 text-[13px] ${
                              category === child.slug
                                ? "bg-[var(--wft-orange)] text-white"
                                : "bg-[#f8f8f8] text-[#777]"
                            }`}
                          >
                            {countProductsForCategoryBranch(categories, sidebarProducts, child.slug)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[24px] bg-white px-6 py-6 shadow-[0_12px_26px_rgba(0,0,0,0.07)] sm:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="label text-[var(--wft-orange)]">{messages.catalog.label}</p>
                  <h2 className="text-3xl font-extrabold tracking-[-0.02em]">{activeTitle}</h2>
                  <p className="text-[15px] leading-7 text-[var(--wft-text-muted)]">
                    {filteringMessage || messages.catalog.fullList}
                  </p>
                </div>
                <div className="rounded-[16px] border border-[var(--wft-line)] bg-[#fafafa] px-4 py-3 text-sm font-semibold text-[var(--wft-dark)]">
                  {messages.catalog.results(products.length)}
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.documentId} locale={locale} messages={messages} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title={emptyStateCopy.title}
                description={emptyStateCopy.description}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
