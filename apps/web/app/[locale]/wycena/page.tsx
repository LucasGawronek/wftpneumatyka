import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { getProductBySlug } from "@/lib/catalog";
import { defaultLocale, getMessages, isLocale, type Locale } from "@/lib/i18n";
import {
  buildBreadcrumbJsonLd,
  buildLocaleAlternates,
  buildPageTitle,
  getOpenGraphLocale,
  localizedAbsoluteUrl,
  trimDescription,
} from "@/lib/seo";

type QuotePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    product?: string;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: QuotePageProps): Promise<Metadata> {
  const [{ locale }, { product }] = await Promise.all([params, searchParams]);
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const messages = getMessages(activeLocale);
  const selectedProduct = product ? await getProductBySlug(product, activeLocale) : null;
  const title = buildPageTitle(messages.quotePage.label);
  const description = trimDescription(
    selectedProduct
      ? `${messages.quotePage.description} ${selectedProduct.name} ${selectedProduct.partNumber}`
      : messages.quotePage.description,
  );
  const suffix = product ? `?product=${encodeURIComponent(product)}` : "";

  return {
    title,
    description,
    alternates: buildLocaleAlternates(activeLocale, `/wycena${suffix}`),
    openGraph: {
      title,
      description,
      url: localizedAbsoluteUrl(activeLocale, `/wycena${suffix}`),
      locale: getOpenGraphLocale(activeLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocalizedQuotePage({ params, searchParams }: QuotePageProps) {
  const [{ locale }, { product }] = await Promise.all([params, searchParams]);
  const messages = getMessages(locale);
  const selectedProduct = product ? await getProductBySlug(product, locale) : null;
  const quoteJsonLd = buildBreadcrumbJsonLd([
    { name: messages.header.nav.home, url: localizedAbsoluteUrl(locale) },
    { name: messages.common.quoteRequest, url: localizedAbsoluteUrl(locale, "/wycena") },
  ]);
  const inquiryFormMessages = {
    name: messages.inquiryForm.name,
    email: messages.inquiryForm.email,
    phone: messages.inquiryForm.phone,
    company: messages.inquiryForm.company,
    message: messages.inquiryForm.message,
    consent: messages.inquiryForm.consent,
    placeholderName: messages.inquiryForm.placeholderName,
    placeholderEmail: messages.inquiryForm.placeholderEmail,
    placeholderPhone: messages.inquiryForm.placeholderPhone,
    placeholderCompany: messages.inquiryForm.placeholderCompany,
    placeholderDefault: messages.inquiryForm.placeholderDefault,
    productPlaceholder: selectedProduct
      ? messages.inquiryForm.placeholderForProduct(
          selectedProduct.name,
          selectedProduct.partNumber,
        )
      : undefined,
    productDefaultMessage: selectedProduct
      ? messages.inquiryForm.defaultValueForProduct(
          selectedProduct.name,
          selectedProduct.partNumber,
        )
      : undefined,
    submitIdle: messages.inquiryForm.submitIdle,
    submitPending: messages.inquiryForm.submitPending,
    success: messages.inquiryForm.success,
    error: messages.inquiryForm.error,
  };

  return (
    <div className="bg-[#f6f6f6] py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteJsonLd) }}
      />
      <div className="wft-container grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
        <section className="overflow-hidden rounded-[24px] bg-white">
          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <p className="label text-[var(--wft-orange)]">{messages.quotePage.label}</p>
            <h1 className="mt-4 max-w-[680px] text-[34px] font-semibold leading-[1.08] text-[#1b1916] sm:text-[48px]">
              {messages.quotePage.title}
            </h1>

            <div className="mt-8 p-0">
              <p className="label text-[var(--wft-orange)]">{messages.common.selectedProduct}</p>
              {selectedProduct ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[28px] font-semibold leading-[1.18] text-[#1b1916]">
                      {selectedProduct.name}
                    </p>
                    <p className="mt-2 text-[15px] leading-7 text-[#5d5852]">
                      {selectedProduct.description || selectedProduct.shortDescription || ""}
                    </p>
                  </div>

                  <div className="space-y-3 text-[15px] leading-7 text-[#5d5852]">
                    <p>
                      <span className="font-semibold text-[#1b1916]">{messages.common.partNumber}:</span>{" "}
                      <span className="font-mono">{selectedProduct.partNumber}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#1b1916]">{messages.common.brand}:</span>{" "}
                      {selectedProduct.brand || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1b1916]">{messages.common.category}:</span>{" "}
                      {selectedProduct.category?.name || "-"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-[15px] leading-7 text-[#5d5852]">
                  {messages.quotePage.noProductSelected}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-[24px] bg-white px-6 py-8 sm:px-8 lg:px-10">
          <p className="label text-[var(--wft-orange)]">{messages.common.quoteRequest}</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] text-[#1b1916]">
            {messages.quotePage.title}
          </h2>
          {selectedProduct ? (
            <p className="mt-4 max-w-[720px] text-[16px] leading-8 text-[#5d5852]">
              {`${messages.common.selectedProduct}: ${selectedProduct.name}`}
            </p>
          ) : null}

          <div className="mt-8">
            <InquiryForm
              locale={locale}
              messages={inquiryFormMessages}
              product={
                selectedProduct
                  ? {
                      documentId: selectedProduct.documentId,
                      name: selectedProduct.name,
                      slug: selectedProduct.slug,
                      partNumber: selectedProduct.partNumber,
                    }
                  : null
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
