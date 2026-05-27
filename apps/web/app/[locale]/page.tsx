import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HeroStats } from "@/components/hero-stats";
import { HomeContactForm } from "@/components/home-contact-form";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getProductImage } from "@/lib/catalog-media";
import {
  catalogPath,
  categoryPath,
  defaultLocale,
  getMessages,
  isLocale,
  productPath,
  type Locale,
} from "@/lib/i18n";
import {
  countProductsForCategoryBranch,
  getCategories,
  getChildCategories,
  getProducts,
  getTopLevelCategories,
} from "@/lib/catalog";
import {
  buildBreadcrumbJsonLd,
  buildLocaleAlternates,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  getOpenGraphLocale,
  localizedAbsoluteUrl,
  trimDescription,
} from "@/lib/seo";
import type { CatalogCategory, CatalogProduct } from "@/types/catalog";

type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const messages = getMessages(activeLocale);
  const description = trimDescription(
    `${messages.site.description} ${messages.home.intro.description}`,
  );

  return {
    title: messages.site.title,
    description,
    alternates: buildLocaleAlternates(activeLocale),
    openGraph: {
      title: messages.site.title,
      description,
      url: localizedAbsoluteUrl(activeLocale),
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
      description,
      images: ["/wft/hero_new.png"],
    },
  };
}

function FeatureRow({ messages }: { messages: ReturnType<typeof getMessages> }) {
  return (
    <div className="grid gap-8 pt-12 lg:grid-cols-3">
      {messages.home.features.map((feature, index) => (
        <Reveal
          key={feature.title}
          delay={index * 90}
          className={`flex items-start gap-5 ${
            index < messages.home.features.length - 1
              ? "lg:border-r lg:border-[#8d8d8d] lg:pr-8"
              : ""
          }`}
        >
          <Image src={`/wft/feature${index + 1}.svg`} alt="" width={44} height={44} className="mt-1" />
          <div>
            <h3 className="text-[16px] font-extrabold uppercase tracking-[0.01em]">
              {feature.title}
            </h3>
            <p className="mt-2 max-w-[290px] text-[15px] leading-8 text-[#5a5a5a]">
              {feature.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function SidebarCategoryCard({
  locale,
  categories,
  rootCategories,
  products,
  messages,
}: {
  locale: Locale;
  categories: CatalogCategory[];
  rootCategories: CatalogCategory[];
  products: CatalogProduct[];
  messages: ReturnType<typeof getMessages>;
}) {
  return (
    <aside className="overflow-hidden rounded-[24px] border border-[var(--wft-orange)] bg-white">
      <div className="bg-[var(--wft-orange)] px-6 py-4 text-[15px] font-extrabold uppercase text-white">
        {messages.common.categories}
      </div>
      <div className="space-y-6 px-6 py-8">
        {rootCategories.map((category) => (
          <div key={category.documentId} className="space-y-3">
            <Link
              href={categoryPath(locale, category.slug)}
              className="flex items-center justify-between gap-4 text-[17px] font-medium transition hover:text-[var(--wft-orange)]"
            >
              <span>{category.name}</span>
              <span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-[14px] text-[#555]">
                {countProductsForCategoryBranch(categories, products, category.slug)}
              </span>
            </Link>
            {getChildCategories(categories, category.slug).map((child) => (
              <Link
                key={child.documentId}
                href={categoryPath(locale, child.slug)}
                className="flex items-center justify-between gap-4 pl-4 text-[15px] text-[#666] transition hover:text-[var(--wft-orange)]"
              >
                <span>{child.name}</span>
                <span className="rounded-full bg-[#f8f8f8] px-3 py-1 text-[13px] text-[#777]">
                  {countProductsForCategoryBranch(categories, products, child.slug)}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function ManufacturersCard({
  locale,
  messages,
}: {
  locale: Locale;
  messages: ReturnType<typeof getMessages>;
}) {
  const manufacturers = [
    { src: "/wft/Bosch-logo.svg", alt: "Bosch", brand: "Bosch", width: 180, height: 50 },
    {
      src: "/wft/SAFHolland.svg",
      alt: "SAF Holland",
      brand: "SAF Holland",
      width: 180,
      height: 48,
    },
    { src: "/wft/bendix.png", alt: "Bendix", brand: "Bendix", width: 150, height: 52 },
    { src: "/wft/Haldex-Logo.svg", alt: "Haldex", brand: "Haldex", width: 160, height: 52 },
    { src: "/wft/WABCO_logo.svg", alt: "WABCO", brand: "WABCO", width: 190, height: 55 },
  ];

  return (
    <aside className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
      <div className="border-b border-[#d7d7d7] px-6 py-4 text-[15px] font-extrabold uppercase">
        {messages.home.sections.manufacturers}
      </div>
      <div className="flex flex-col items-center gap-7 px-6 py-8">
        {manufacturers.map((logo) => (
          <Link
            key={logo.alt}
            href={catalogPath(locale, { brand: logo.brand })}
            className="rounded-[14px] p-3 transition hover:bg-[#f7f7f7] hover:shadow-[0_10px_22px_rgba(0,0,0,0.06)]"
            title={logo.brand}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto w-auto max-w-[190px]"
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}

function RepairSetsCard({
  locale,
  items,
  messages,
}: {
  locale: Locale;
  items: CatalogProduct[];
  messages: ReturnType<typeof getMessages>;
}) {
  return (
    <aside className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
      <div className="border-b border-[#d7d7d7] px-6 py-4 text-[15px] font-extrabold uppercase">
        {messages.home.sections.repairSets}
      </div>
      <div className="space-y-5 px-4 py-5">
        {items.map((item) => (
          <div key={item.documentId} className="grid grid-cols-[86px_1fr] gap-4">
            <Link
              href={productPath(locale, item.slug)}
              className="relative block aspect-square overflow-hidden rounded-[8px] bg-[#f5f5f5]"
            >
              <Image
                src={getProductImage(item)}
                alt={item.name}
                fill
                className="object-cover transition duration-300 hover:scale-[1.03]"
                sizes="86px"
              />
            </Link>
            <div>
              <p className="text-[17px] leading-9">
                {item.name}
                {item.partNumber ? (
                  <>
                    <br />
                    <span className="font-extrabold">{item.partNumber}</span>
                  </>
                ) : null}
              </p>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6c6c6c]">
                {item.brand || messages.common.brandFallback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ContactInfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-5 rounded-[8px] bg-[var(--wft-orange)] px-4 py-4 text-white">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-white/40">
        {icon}
      </div>
      <div>
        <div className="text-[14px] text-white/80">{label}</div>
        <div className="text-[17px] font-medium">{value}</div>
      </div>
    </div>
  );
}

function PromoHeading({ locale, lines }: { locale: Locale; lines: readonly string[] }) {
  if (locale === "pl") {
    return (
      <h2 className="max-w-[320px] text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:max-w-[470px] sm:text-[40px] sm:leading-[48px]">
        <span className="block sm:whitespace-nowrap">
          Zobacz <span className="text-[var(--wft-dark)]">ofertę części</span>
        </span>
        <span className="block sm:whitespace-nowrap">{lines[1]}</span>
        <span className="block sm:whitespace-nowrap">{lines[2]}</span>
      </h2>
    );
  }

  if (locale === "en") {
    return (
      <h2 className="max-w-[320px] text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:max-w-[470px] sm:text-[40px] sm:leading-[48px]">
        <span className="block sm:whitespace-nowrap">
          See our <span className="text-[var(--wft-dark)]">parts offer</span>
        </span>
        <span className="block sm:whitespace-nowrap">{lines[1]}</span>
        <span className="block sm:whitespace-nowrap">{lines[2]}</span>
      </h2>
    );
  }

  return (
    <h2 className="max-w-[320px] text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:max-w-[470px] sm:text-[40px] sm:leading-[48px]">
      <span className="block text-[var(--wft-dark)] sm:whitespace-nowrap">{lines[0]}</span>
      <span className="block sm:whitespace-nowrap">{lines[1]}</span>
      <span className="block sm:whitespace-nowrap">{lines[2]}</span>
    </h2>
  );
}

function normalizeCategoryMatch(value?: string | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function pickRandomProducts(
  products: CatalogProduct[],
  count: number,
  excludedIds: Set<string> = new Set(),
) {
  const pool = products.filter((product) => !excludedIds.has(product.documentId));
  const shuffled = [...pool];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);

  const [categories, products] = await Promise.all([getCategories(locale), getProducts({ locale })]);

  const newestProducts = products.slice(0, 3);
  const newestProductIds = new Set(newestProducts.map((product) => product.documentId));
  const randomPopularProducts = pickRandomProducts(products, 3, newestProductIds);
  const popularProducts =
    randomPopularProducts.length > 0 ? randomPopularProducts : pickRandomProducts(products, 3);
  const sidebarCategories = getTopLevelCategories(categories).slice(0, 6);
  const googleMapBusinessQuery = encodeURIComponent(
    "WFT.Pneumatyka Waldemar Balak Regeneracja zacisków, zaworów, Długa 23, 64-000 Sierakowo",
  );
  const googleMapEmbedUrl = `https://www.google.com/maps?q=${googleMapBusinessQuery}&z=19&output=embed`;
  const homeJsonLd = [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(locale),
    buildBreadcrumbJsonLd([
      {
        name: messages.header.nav.home,
        url: localizedAbsoluteUrl(locale),
      },
    ]),
  ];
  const repairSetsCategory = categories.find((category) => {
    const normalizedName = normalizeCategoryMatch(category.name);
    const normalizedSlug = normalizeCategoryMatch(category.slug);

    return (
      normalizedName === "zestawy naprawcze" ||
      normalizedName === normalizeCategoryMatch(messages.home.sections.repairSets) ||
      normalizedSlug === "zestawy-naprawcze"
    );
  });
  const repairSetProducts =
    products
      .filter((product) => product.category?.slug === repairSetsCategory?.slug)
      .slice(0, 3) || [];
  const repairSets = repairSetProducts.length > 0 ? repairSetProducts : newestProducts;

  return (
    <div className="pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <section className="relative min-h-[calc(100svh-var(--wft-header-height))] overflow-hidden bg-[#201d1d] text-white max-sm:min-h-0">
        <Image
          src="/wft/hero_new.png"
          alt=""
          fill
          priority
          className="object-cover object-[72%_center] sm:object-[62%_center] lg:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,18,18,0.76)_0%,rgba(21,18,18,0.58)_34%,rgba(21,18,18,0.24)_68%,rgba(21,18,18,0.12)_100%)] sm:bg-black/20" />

        <div className="relative z-10 w-full">
          <div className="wft-container hero-shell">
            <div className="hero-content max-sm:w-full max-sm:py-8">
              <Reveal delay={60}>
                <h1 className="hero-title">
                  <span className="block">
                    <span className="text-[var(--wft-orange)]">{messages.home.hero.accent}</span>{" "}
                    {messages.home.hero.lines[0]}
                  </span>
                  <span className="block">{messages.home.hero.lines[1]}</span>
                  <span className="block">{messages.home.hero.lines[2]}</span>
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="hero-copy mt-8 whitespace-pre-line text-white/85 lg:mt-10">
                  {messages.home.hero.copy}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-10">
                  <Link
                    href={catalogPath(locale)}
                    className="inline-flex h-13 items-center justify-center rounded-[10px] bg-[var(--wft-orange)] px-6 text-[15px] font-semibold !text-white transition hover:bg-[var(--wft-orange-deep)] hover:!text-white sm:h-14 sm:px-8"
                    style={{ color: "#fff" }}
                  >
                    {messages.home.hero.catalogCta}
                  </Link>
                  <Link
                    href={`/${locale}/uslugi`}
                    className="inline-flex h-13 items-center justify-center rounded-[10px] border border-[var(--wft-orange)] bg-black/25 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition hover:bg-black/40 sm:h-14 sm:px-11"
                  >
                    {messages.home.hero.servicesCta}
                  </Link>
                </div>
              </Reveal>

              <Reveal
                delay={320}
                className="mt-6 max-w-[746px] rounded-[22px] bg-[rgba(255,122,26,0.72)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:mt-10"
              >
                <HeroStats stats={messages.home.stats} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--wft-body)] py-14 sm:py-20">
        <div className="wft-container">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
            <Reveal>
              <div>
                <h2 className="max-w-[690px] text-[28px] font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-[40px] sm:leading-[0.96] lg:text-[49px] lg:leading-[48px]">
                  <span className="block">{messages.home.intro.titleLines[0]}</span>
                  <span className="block">
                    <span className="text-[var(--wft-orange)]">{messages.home.intro.titleLines[1]}</span>
                  </span>
                  <span className="block">{messages.home.intro.titleLines[2]}</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={110}>
              <p className="max-w-[560px] pt-1 text-[16px] leading-7 text-[#363636] sm:pt-3 sm:text-[18px] sm:leading-8 lg:pt-4">
                {messages.home.intro.description}
              </p>
            </Reveal>
          </div>

          <FeatureRow messages={messages} />
        </div>
      </section>

      <section className="bg-[var(--wft-body)] pb-10 pt-8">
        <div className="wft-container grid gap-7 lg:grid-cols-[1.62fr_0.98fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-[24px] bg-white shadow-[0_18px_34px_rgba(0,0,0,0.08)]">
              <div className="grid h-full lg:grid-cols-[0.72fr_1.28fr]">
                <div className="relative z-10 flex flex-col items-center justify-center px-7 pb-6 pt-10 text-center sm:px-8 lg:items-start lg:px-7 lg:py-12 lg:text-left">
                  <h3 className="whitespace-pre-line text-center text-[26px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] sm:text-[32px] lg:text-left lg:text-[38px] lg:leading-[1.08]">
                    <span className="text-[var(--wft-orange)]">
                      {messages.home.categoryShowcase.brakeCalipers.split("\n")[0]}
                    </span>
                    {"\n"}
                    {messages.home.categoryShowcase.brakeCalipers.split("\n")[1] ?? ""}
                  </h3>
                  <Link
                    href={categoryPath(locale, "zaciski-hamulcowe")}
                    className="mt-6 inline-flex h-11 w-[98px] items-center justify-center rounded-[10px] bg-[var(--wft-orange)] text-[15px] font-semibold !text-white lg:mt-8 lg:h-12"
                    style={{ color: "#fff" }}
                  >
                    {messages.home.categoryShowcase.shopCta}
                  </Link>
                </div>
                <div className="relative min-h-[250px] sm:min-h-[360px] lg:min-h-[420px]">
                  <Image
                    src="/wft/zaciski_hamulcowe.png"
                    alt="Zaciski hamulcowe"
                    fill
                    className="object-contain object-center px-6 pb-2 pt-2 sm:px-8 lg:object-cover lg:px-0 lg:pb-0 lg:pt-0 lg:object-[78%_58%]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 76vw, 720px"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-7">
            <Reveal delay={80}>
              <div className="relative overflow-hidden rounded-[24px] bg-white text-white shadow-[0_18px_34px_rgba(0,0,0,0.08)]">
                <div className="absolute inset-0">
                  <Image
                    src="/wft/zestaw_naprawczy.png"
                    alt=""
                    fill
                    className="object-cover object-[72%_center] sm:object-right"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,32,32,0.92)_0%,rgba(34,32,32,0.82)_44%,rgba(34,32,32,0.36)_78%,rgba(34,32,32,0.08)_100%)]" />
                <div className="relative grid min-h-[220px] grid-cols-[1.18fr_0.82fr] sm:min-h-[268px] sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
                    <h3 className="whitespace-pre-line text-[24px] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[28px]">
                      <span className="text-[var(--wft-orange)]">
                        {messages.home.categoryShowcase.repairSets.split("\n")[0]}
                      </span>
                      {"\n"}
                      {messages.home.categoryShowcase.repairSets.split("\n")[1] ?? ""}
                    </h3>
                    <Link
                      href={categoryPath(locale, repairSetsCategory?.slug ?? "zestawy-naprawcze")}
                      className="mt-6 inline-flex h-11 w-[112px] items-center justify-center rounded-[10px] bg-[var(--wft-orange)] text-[15px] font-semibold !text-white sm:mt-8 sm:h-12 sm:w-[126px]"
                      style={{ color: "#fff" }}
                    >
                      {messages.home.categoryShowcase.shopCta}
                    </Link>
                  </div>
                  <div className="relative" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="relative overflow-hidden rounded-[24px] bg-white text-white shadow-[0_18px_34px_rgba(0,0,0,0.08)]">
                <div className="absolute inset-0">
                  <Image
                    src="/wft/zawory_pneumatyczne.png"
                    alt=""
                    fill
                    className="object-cover object-[72%_center] sm:object-right"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,32,32,0.92)_0%,rgba(34,32,32,0.82)_44%,rgba(34,32,32,0.36)_78%,rgba(34,32,32,0.08)_100%)]" />
                <div className="relative grid min-h-[220px] grid-cols-[1.18fr_0.82fr] sm:min-h-[268px] sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8">
                    <h3 className="whitespace-pre-line text-[22px] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[25px]">
                      <span className="text-[var(--wft-orange)]">
                        {messages.home.categoryShowcase.pneumaticValves.split("\n")[0]}
                      </span>
                      {"\n"}
                      {messages.home.categoryShowcase.pneumaticValves.split("\n")[1] ?? ""}
                    </h3>
                    <Link
                      href={categoryPath(locale, "zawory-pneumatyczne")}
                      className="mt-6 inline-flex h-11 w-[112px] items-center justify-center rounded-[10px] bg-[var(--wft-orange)] text-[15px] font-semibold !text-white sm:mt-8 sm:h-12 sm:w-[126px]"
                      style={{ color: "#fff" }}
                    >
                      {messages.home.categoryShowcase.shopCta}
                    </Link>
                  </div>
                  <div className="relative" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-12">
        <div className="wft-container grid gap-8 lg:grid-cols-[260px_1fr]">
          <Reveal>
            <SidebarCategoryCard
              locale={locale}
              categories={categories}
              rootCategories={sidebarCategories}
              products={products}
              messages={messages}
            />
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="flex items-center justify-between">
                <h2 className="text-[34px] font-light uppercase tracking-[0.01em] text-[var(--wft-orange)]">
                  {messages.home.sections.newArrivals}
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-8 xl:grid-cols-3">
              {newestProducts.map((product, index) => (
                <Reveal key={product.documentId} delay={index * 90}>
                  <ProductCard locale={locale} messages={messages} product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-10">
        <div className="wft-container grid gap-8 lg:grid-cols-[260px_1fr]">
          <Reveal>
            <ManufacturersCard locale={locale} messages={messages} />
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="flex items-center justify-between">
                <h2 className="text-[34px] font-light uppercase tracking-[0.01em] text-[var(--wft-orange)]">
                  {messages.home.sections.popularParts}
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-8 xl:grid-cols-3">
              {popularProducts.map((product, index) => (
                <Reveal key={product.documentId} delay={index * 90}>
                  <ProductCard locale={locale} messages={messages} product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] pb-12 pt-10">
        <div className="wft-container grid gap-8 lg:grid-cols-[260px_1fr]">
          <Reveal>
            <RepairSetsCard locale={locale} items={repairSets} messages={messages} />
          </Reveal>

          <Reveal delay={110}>
            <div className="relative overflow-hidden rounded-[24px] bg-[var(--wft-orange)] shadow-[0_18px_34px_rgba(0,0,0,0.08)]">
              <div
                className="absolute inset-y-0 right-[-12%] hidden w-[58%] bg-[#262121] sm:block"
                style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 72% 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[#262121] sm:hidden" />
              <div className="relative min-h-[420px] px-6 py-8 sm:min-h-[360px] sm:px-8 sm:py-10 lg:min-h-[382px] lg:px-12 lg:py-12">
                <div className="relative z-10 flex max-w-[470px] flex-col justify-center text-white lg:min-h-[286px]">
                  <PromoHeading locale={locale} lines={messages.home.promo.lines} />
                  <Link
                    href={catalogPath(locale)}
                    className="mt-6 inline-flex h-11 w-fit items-center rounded-[10px] bg-[var(--wft-dark)] px-6 text-[14px] font-semibold text-white transition hover:bg-black sm:mt-7 sm:px-7"
                  >
                    {messages.home.promo.cta}
                  </Link>
                </div>
                <div className="pointer-events-none absolute bottom-[-1%] right-[-12%] z-10 h-[55%] w-[78%] sm:bottom-[-2%] sm:right-[-2%] sm:top-[-2%] sm:h-auto sm:w-[58%] lg:right-[1%] lg:top-[-6%] lg:w-[54%]">
                  <Image
                    src="/wft/zawor.png"
                    alt=""
                    fill
                    className="object-contain object-center drop-shadow-[0_22px_34px_rgba(0,0,0,0.3)] max-sm:scale-[0.88] lg:scale-[1.18]"
                    sizes="(max-width: 640px) 58vw, (max-width: 1024px) 42vw, 520px"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-20">
        <div className="wft-container">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex rounded-[8px] bg-[var(--wft-orange)] px-3 py-1 text-[14px] font-medium text-white">
                {messages.home.contact.badge}
              </span>
              <h2 className="mt-6 text-[46px] font-extrabold leading-none sm:text-[66px]">
                <span className="text-[var(--wft-orange)]">{messages.home.contact.titleAccent}</span>{" "}
                {messages.home.contact.titleRest}
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Reveal delay={40}>
              <ContactInfoCard
                label={messages.common.email}
                value={messages.home.contact.email}
                icon={
                  <Image
                    src="/email.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                }
              />
            </Reveal>
            <Reveal delay={110}>
              <ContactInfoCard
                label={messages.common.phone}
                value={messages.home.contact.phone}
                icon={
                  <Image
                    src="/phone.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                }
              />
            </Reveal>
            <Reveal delay={180}>
              <ContactInfoCard
                label={messages.common.address}
                value={messages.home.contact.address}
                icon={
                  <Image
                    src="/home.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                }
              />
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.52fr_0.48fr] lg:items-start">
            <Reveal>
              <div className="space-y-7">
                <div className="overflow-hidden rounded-[22px] shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
                  <div className="relative aspect-[16/10] bg-white">
                    <Image
                      src="/building.webp"
                      alt={messages.home.contact.buildingPhoto}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 38vw, 100vw"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-[22px] shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
                  <div className="relative aspect-[805/611] bg-white">
                    <iframe
                      src={googleMapEmbedUrl}
                      title="Mapa dojazdu Google"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[22px] bg-transparent">
                <HomeContactForm locale={locale} messages={messages.homeContactForm} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
