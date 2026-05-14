import Image from "next/image";
import Link from "next/link";
import {
  catalogPath,
  categoryPath,
  contactPath,
  localizedPath,
  quotePath,
  type AppMessages,
  type Locale,
} from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  messages: AppMessages;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9V24C19.6 23.1 24 18.1 24 12.1Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M7.8 3.6c.4-.4 1-.6 1.5-.4l2.5.8c.7.2 1.1 1 1 1.7l-.4 2.2c0 .4.1.8.4 1.1l2.2 2.2c.3.3.7.4 1.1.4l2.2-.4c.7-.1 1.4.3 1.7 1l.8 2.5c.2.5 0 1.1-.4 1.5l-1.6 1.6c-.8.8-1.9 1.2-3 1.1-3.3-.3-6.5-1.8-9.1-4.4-2.6-2.6-4.1-5.8-4.4-9.1-.1-1.1.3-2.2 1.1-3L7.8 3.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5h17v11h-17z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7.5 7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function getFooterLabels(locale: Locale) {
  if (locale === "pl") {
    return {
      company: "WFT Pneumatyka",
      intro:
        "Regeneracja zacisków, zaworów i dobór części do układów pneumatycznych dla transportu ciężarowego.",
      navigation: "Nawigacja",
      offer: "Oferta",
      contact: "Kontakt bezpośredni",
      quote: "Zapytaj o wycenę",
      about: "O nas",
      services: "Usługi",
      home: "Strona główna",
      popularCategories: "Popularne kategorie",
      social: "Social media",
    };
  }

  if (locale === "de") {
    return {
      company: "WFT Pneumatyka",
      intro:
        "Regeneration von Bremssätteln, Ventilen und Auswahl von Teilen für pneumatische Systeme im Schwertransport.",
      navigation: "Navigation",
      offer: "Angebot",
      contact: "Direkter Kontakt",
      quote: "Angebot anfragen",
      about: "Über uns",
      services: "Dienstleistungen",
      home: "Startseite",
      popularCategories: "Beliebte Kategorien",
      social: "Social Media",
    };
  }

  return {
    company: "WFT Pneumatyka",
    intro:
      "Brake caliper and valve regeneration plus parts selection for pneumatic systems in heavy transport.",
    navigation: "Navigation",
    offer: "Offer",
    contact: "Direct contact",
    quote: "Request a quote",
    about: "About us",
    services: "Services",
    home: "Home",
    popularCategories: "Popular categories",
    social: "Social media",
  };
}

function sanitizeLabel(value: string) {
  return value.replace(/\n/g, " ");
}

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  const labels = getFooterLabels(locale);
  const categoryLinks = [
    {
      href: categoryPath(locale, "zaciski-hamulcowe"),
      label: sanitizeLabel(messages.home.categoryShowcase.brakeCalipers),
    },
    {
      href: categoryPath(locale, "zestawy-naprawcze"),
      label: sanitizeLabel(messages.home.categoryShowcase.repairSets),
    },
    {
      href: categoryPath(locale, "zawory-pneumatyczne"),
      label: sanitizeLabel(messages.home.categoryShowcase.pneumaticValves),
    },
  ];
  const navigationLinks = [
    { href: localizedPath(locale), label: labels.home },
    { href: localizedPath(locale, "/o-nas"), label: labels.about },
    { href: localizedPath(locale, "/uslugi"), label: labels.services },
    { href: catalogPath(locale), label: messages.footer.catalog },
    { href: contactPath(locale), label: messages.footer.contact },
    { href: localizedPath(locale, "/polityka-prywatnosci"), label: messages.footer.privacy },
  ];
  const offerLinks = [
    { href: catalogPath(locale), label: messages.common.allProducts },
    ...categoryLinks,
    { href: quotePath(locale), label: labels.quote },
  ];

  return (
    <footer className="mt-20 overflow-hidden bg-[linear-gradient(180deg,#2b2526_0%,#181415_100%)] text-white">
      <div className="wft-container py-14 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.85fr_0.9fr_1fr]">
          <div className="rounded-[28px] border border-white/8 p-7">
            <Image src="/wft_logo_white.svg" alt={messages.site.title} width={176} height={50} />
            <h2 className="mt-6 text-[24px] font-extrabold tracking-[-0.02em]">{labels.company}</h2>
            <p className="mt-4 max-w-[420px] text-[15px] leading-7 text-white/76">{labels.intro}</p>
          </div>

          <div className="rounded-[24px] border border-white/8 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--wft-orange)]">
              {labels.navigation}
            </p>
            <div className="mt-5 grid gap-3">
              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-white/82 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/8 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--wft-orange)]">
              {labels.offer}
            </p>
            <div className="mt-5 grid gap-3">
              {offerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-white/82 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">
              {labels.popularCategories}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/8 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--wft-orange)]">
              {labels.contact}
            </p>
            <div className="mt-5 grid gap-4">
              <a
                href={`tel:${messages.home.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-start gap-3 text-white/84 transition hover:text-white"
              >
                <span className="mt-0.5 text-[var(--wft-orange)]">
                  <PhoneIcon />
                </span>
                <span className="text-[15px] leading-7">{messages.home.contact.phone}</span>
              </a>
              <a
                href={`mailto:${messages.home.contact.email}`}
                className="flex items-start gap-3 text-white/84 transition hover:text-white"
              >
                <span className="mt-0.5 text-[var(--wft-orange)]">
                  <MailIcon />
                </span>
                <span className="text-[15px] leading-7">{messages.home.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/84">
                <span className="mt-0.5 text-[var(--wft-orange)]">
                  <PinIcon />
                </span>
                <span className="text-[15px] leading-7">{messages.home.contact.address}</span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">
                {labels.social}
              </span>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-[var(--wft-orange)] hover:text-[var(--wft-orange)]"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-[14px] text-white/58 lg:flex-row lg:items-center lg:justify-between">
          <p>{messages.footer.copyright}</p>
          <p>{messages.footer.madeBy}</p>
        </div>
      </div>
    </footer>
  );
}
