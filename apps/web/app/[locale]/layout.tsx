import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultLocale, getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import {
  buildLocaleAlternates,
  getOpenGraphLocale,
  localizedAbsoluteUrl,
} from "@/lib/seo";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const messages = getMessages(activeLocale);

  return {
    title: messages.site.title,
    description: messages.site.description,
    alternates: buildLocaleAlternates(activeLocale),
    openGraph: {
      title: messages.site.title,
      description: messages.site.description,
      url: localizedAbsoluteUrl(activeLocale),
      siteName: messages.site.title,
      locale: getOpenGraphLocale(activeLocale),
      type: "website",
      images: [
        {
          url: "/wft/hero_new.png",
          width: 1200,
          height: 630,
          alt: messages.site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.site.title,
      description: messages.site.description,
      images: ["/wft/hero_new.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        locale={locale as Locale}
        messages={{
          siteTitle: messages.site.title,
          locales: messages.locales,
          header: messages.header,
          search: {
            fetchError: messages.search.fetchError,
            label: messages.search.label,
            placeholder: messages.search.placeholder,
            button: messages.search.button,
            minChars: messages.search.minChars,
            loading: messages.search.loading,
            noResults: messages.search.noResults,
            fallbackProductLabel: messages.common.product,
          },
        }}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale as Locale} messages={messages} />
    </div>
  );
}
