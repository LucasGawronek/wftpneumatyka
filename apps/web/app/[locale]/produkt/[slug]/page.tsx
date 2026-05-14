import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { getProductBySlug } from "@/lib/catalog";
import { getProductImage } from "@/lib/catalog-media";
import { specificationEntries } from "@/lib/format";
import { catalogPath, categoryPath, getMessages, quotePath, type Locale } from "@/lib/i18n";

type ProductPageProps = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export default async function LocalizedProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const messages = getMessages(locale);
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const entries = specificationEntries(product.specifications);
  const productImages = Array.from(
    new Set([getProductImage(product), ...(product.galleryImages ?? []).filter(Boolean)]),
  );

  return (
    <div className="bg-[#f4f4f4] py-8 md:py-12">
      <div className="wft-container flex flex-col gap-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#7a7a7a]">
          <Link href={`/${locale}`} className="transition hover:text-[var(--wft-orange)]">
            {messages.header.nav.home}
          </Link>
          <span>/</span>
          <Link href={catalogPath(locale)} className="transition hover:text-[var(--wft-orange)]">
            {messages.header.nav.shop}
          </Link>
          {product.category ? (
            <>
              <span>/</span>
              <Link
                href={categoryPath(locale, product.category.slug)}
                className="transition hover:text-[var(--wft-orange)]"
              >
                {product.category.name}
              </Link>
            </>
          ) : null}
          <span>/</span>
          <span className="font-semibold text-[#1f1f1f]">{product.name}</span>
        </nav>

        <section className="grid gap-0 overflow-hidden rounded-[24px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.06)] xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <div className="border-b border-[#ececec] p-6 xl:border-b-0 xl:border-r xl:border-[#ececec] xl:p-8">
            <ProductImageGallery
              images={productImages}
              productName={product.name}
              imageLabelPrefix={messages.common.description}
            />
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex flex-wrap gap-2">
              {product.category ? (
                <Link
                  href={categoryPath(locale, product.category.slug)}
                  className="inline-flex rounded-[8px] border border-[#ececec] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6b6b6b] transition hover:border-[var(--wft-orange)] hover:text-[var(--wft-orange)]"
                >
                  {product.category.name}
                </Link>
              ) : null}
              {product.featured ? (
                <span className="inline-flex rounded-[8px] bg-[var(--wft-orange)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                  {messages.common.featuredProduct}
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 max-w-[620px] text-[32px] font-semibold leading-[1.22] text-[#1c1c1c] sm:text-[42px]">
              {product.name}
            </h1>

            <div className="mt-6 border-y border-[#ececec] py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[12px] bg-[#fafafa] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                    {messages.common.partNumber}
                  </p>
                  <p className="mt-2 font-mono text-base font-semibold text-[#1f1f1f]">
                    {product.partNumber}
                  </p>
                </div>
                <div className="rounded-[12px] bg-[#fafafa] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                    {messages.common.brand}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#1f1f1f]">
                    {product.brand || messages.common.fillInFallback}
                  </p>
                </div>
                <div className="rounded-[12px] bg-[#fafafa] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                    {messages.common.category}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#1f1f1f]">
                    {product.category?.name || messages.common.categoryFallback}
                  </p>
                </div>
                <div className="rounded-[12px] bg-[#fafafa] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                    {messages.productPage.offerType}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#1f1f1f]">
                    {messages.common.quoteRequest}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                {messages.common.description}
              </p>
              <p className="mt-3 max-w-[640px] whitespace-pre-line text-[15px] leading-7 text-[#636363]">
                {product.shortDescription || product.description || ""}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#ececec] pt-6 sm:flex-row">
              <Link
                href={quotePath(locale, product.slug)}
                className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[var(--wft-orange)] px-7 text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-[var(--wft-orange-deep)]"
                style={{ color: "#fff" }}
              >
                {messages.productPage.askQuote}
              </Link>
              <Link
                href={catalogPath(locale)}
                className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[var(--wft-dark)] bg-[var(--wft-dark)] px-7 text-[14px] font-semibold uppercase tracking-[0.04em] !text-white transition hover:border-[var(--wft-orange)] hover:bg-[var(--wft-orange)] hover:!text-white"
                style={{ color: "#fff" }}
              >
                {messages.productPage.backToShop}
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.06)]">
            <div className="border-b border-[#ececec] px-6 py-4 sm:px-8">
              <div className="flex flex-wrap gap-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5e5e5e]">
                <span className="border-b-2 border-[var(--wft-orange)] pb-2 text-[#1f1f1f]">
                  {messages.common.description}
                </span>
                <span>{messages.common.additionalInformation}</span>
              </div>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-[22px] font-semibold text-[#1f1f1f]">
                {messages.productPage.productDescription}
              </h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-[#636363]">
                {product.description || product.shortDescription || ""}
              </p>
            </div>
          </div>

          <aside className="rounded-[24px] bg-white px-6 py-7 shadow-[0_12px_28px_rgba(0,0,0,0.06)] sm:px-8 sm:py-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1f1f1f]">
              {messages.common.technicalData}
            </p>
            <div className="mt-5 grid gap-3">
              {entries.map(([key, value]) => (
                <div key={key} className="rounded-[12px] border border-[#ececec] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8a8a]">
                    {key}
                  </p>
                  <p className="mt-2 text-[14px] font-medium text-[#1f1f1f]">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
