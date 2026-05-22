import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ServicesTabs } from "@/components/services-tabs";
import {
  catalogPath,
  contactPath,
  defaultLocale,
  getMessages,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import {
  buildBreadcrumbJsonLd,
  buildLocaleAlternates,
  buildPageTitle,
  getOpenGraphLocale,
  localizedAbsoluteUrl,
  trimDescription,
} from "@/lib/seo";

type ServicesPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const content = servicesContent[activeLocale];
  const title = buildPageTitle(content.title);
  const description = trimDescription(content.lead);

  return {
    title,
    description,
    alternates: buildLocaleAlternates(activeLocale, "/uslugi"),
    openGraph: {
      title,
      description,
      url: localizedAbsoluteUrl(activeLocale, "/uslugi"),
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

type ServicesContent = {
  eyebrow: string;
  title: string;
  lead: string;
  offerTitle: string;
  services: Array<{
    title: string;
    text: string;
    points: string[];
    imageSrc: string;
    imageAlt: string;
  }>;
  strengthsTitle: string;
  strengths: string[];
  ctaTitle: string;
  ctaText: string;
};

const servicesContent: Record<Locale, ServicesContent> = {
  pl: {
    eyebrow: "Usługi",
    title: "Kompleksowa obsługa układów pneumatycznych",
    lead:
      "Zajmujemy się regeneracją, diagnostyką oraz naprawą podzespołów w pojazdach ciężarowych, naczepach oraz autobusach, dbając o niezawodność i bezpieczeństwo pojazdu w codziennej pracy.",
    offerTitle: "Oferta WFT Pneumatyka",
    services: [
      {
        title: "Regeneracja zaworów pneumatycznych",
        text: "Przywracamy sprawność zaworów odpowiedzialnych za poprawne działanie układu. Skupiamy się na szczelności, precyzji pracy i bezpieczeństwie użytkowania po naprawie.",
        points: [
          "Weryfikacja stanu technicznego i najczęstszych przyczyn awarii",
          "Dobór odpowiednich zestawów naprawczych i części",
          "Kontrola szczelności oraz poprawności działania po regeneracji",
          "Przygotowanie podzespołu do dalszej eksploatacji w pojeździe",
        ],
        imageSrc: "/wft/zawory_pneumatyczne.png",
        imageAlt: "Regeneracja zaworów pneumatycznych",
      },
      {
        title: "Regeneracja zacisków hamulcowych",
        text: "Wykonujemy regenerację zacisków hamulcowych dla pojazdów użytkowych, pomagając wydłużyć żywotność podzespołów i ograniczyć ryzyko przestojów w pracy pojazdu.",
        points: [
          "Ocena zużycia najważniejszych elementów zacisku",
          "Czyszczenie, wymiana zużytych części i ponowny montaż",
          "Przywrócenie prawidłowej pracy układu hamulcowego",
          "Rozwiązania dopasowane do zastosowania w pojeździe ciężarowym",
        ],
        imageSrc: "/wft/zaciski_hamulcowe.png",
        imageAlt: "Regeneracja zacisków hamulcowych",
      },
      {
        title: "Diagnostyka komputerowa",
        text: "Wspieramy proces naprawy diagnostyką komputerową, co pozwala szybciej wykryć nieprawidłowości oraz trafniej dobrać zakres dalszych prac serwisowych.",
        points: [
          "Szybsze rozpoznanie błędów i nieprawidłowych parametrów",
          "Lepsze dopasowanie zakresu naprawy do faktycznej usterki",
          "Wsparcie przy ocenie stanu układów pneumatycznych i hamulcowych",
          "Ograniczenie niepotrzebnych kosztów i krótszy czas postoju",
        ],
        imageSrc: "/wft/hero_new.png",
        imageAlt: "Diagnostyka komputerowa",
      },
      {
        title: "Zestawy naprawcze",
        text: "Pomagamy dobrać odpowiednie zestawy naprawcze do konkretnych zastosowań, dzięki czemu klient szybciej przechodzi od diagnozy do skutecznej naprawy.",
        points: [
          "Dobór zestawu do konkretnego zaworu lub podzespołu",
          "Wsparcie przy porównaniu dostępnych rozwiązań",
          "Lepsze dopasowanie części do realnych warunków pracy",
          "Sprawniejsze przejście od wyceny do naprawy",
        ],
        imageSrc: "/wft/zestaw_naprawczy.png",
        imageAlt: "Zestawy naprawcze",
      },
    ],
    strengthsTitle: "Co wyróżnia naszą ofertę",
    strengths: [
      "Wieloletnie doświadczenie w pneumatyce pojazdowej",
      "Szybka realizacja zleceń",
      "Wysoka jakość usług",
      "Współpraca z renomowanymi markami",
    ],
    ctaTitle: "Potrzebujesz naprawy, regeneracji albo diagnostyki?",
    ctaText:
      "Wyślij zapytanie i opisz problem, pojazd lub szukany podzespół. Pomożemy dobrać najlepsze rozwiązanie oraz przygotować wycenę.",
  },
  en: {
    eyebrow: "Services",
    title: "Comprehensive pneumatic system support",
    lead:
      "We provide regeneration, diagnostics and repair of components used in trucks, trailers and buses, with a focus on reliability and road safety.",
    offerTitle: "WFT Pneumatyka service offer",
    services: [
      {
        title: "Pneumatic valve regeneration",
        text: "We restore the efficiency of valves responsible for correct system operation, with attention to tightness, precision and safe performance after repair.",
        points: [
          "Technical verification and diagnosis of the component",
          "Selection of suitable repair kits and parts",
          "Leak testing and validation after regeneration",
          "Preparing the component for further vehicle use",
        ],
        imageSrc: "/wft/zawory_pneumatyczne.png",
        imageAlt: "Pneumatic valve regeneration",
      },
      {
        title: "Brake caliper regeneration",
        text: "We regenerate brake calipers for commercial vehicles to extend component life and reduce the risk of downtime during daily operation.",
        points: [
          "Inspection of wear on key brake caliper elements",
          "Cleaning, replacement of worn parts and reassembly",
          "Restoring proper braking system performance",
          "Solutions matched to heavy vehicle applications",
        ],
        imageSrc: "/wft/zaciski_hamulcowe.png",
        imageAlt: "Brake caliper regeneration",
      },
      {
        title: "Computer diagnostics",
        text: "We support the repair process with computer diagnostics, helping identify faults faster and define the right scope of service work.",
        points: [
          "Faster identification of faults and irregular parameters",
          "Better repair scope matched to the real issue",
          "Support in assessing pneumatic and braking systems",
          "Reduced unnecessary cost and shorter downtime",
        ],
        imageSrc: "/wft/hero_new.png",
        imageAlt: "Computer diagnostics",
      },
      {
        title: "Repair kits",
        text: "We help select suitable repair kits for specific applications so customers can move from diagnosis to effective repair more efficiently.",
        points: [
          "Matching kits to a specific valve or component",
          "Support when comparing available solutions",
          "Better fit for real operating conditions",
          "Smoother path from quote to repair",
        ],
        imageSrc: "/wft/zestaw_naprawczy.png",
        imageAlt: "Repair kits",
      },
    ],
    strengthsTitle: "What sets our offer apart",
    strengths: [
      "Years of experience in vehicle pneumatics",
      "Fast turnaround",
      "High service quality",
      "Cooperation with trusted brands",
    ],
    ctaTitle: "Need repair, regeneration or diagnostics?",
    ctaText:
      "Send us an inquiry and describe the issue, vehicle or component you need help with. We will help you choose the right solution and prepare a quote.",
  },
  de: {
    eyebrow: "Leistungen",
    title: "Umfassender Service fur pneumatische Systeme",
    lead:
      "Wir bieten Regeneration, Diagnose und Reparatur von Baugruppen fur Lkw, Auflieger und Busse und achten dabei auf Zuverlassigkeit und Sicherheit im Alltag.",
    offerTitle: "Leistungsangebot von WFT Pneumatyka",
    services: [
      {
        title: "Regeneration pneumatischer Ventile",
        text: "Wir stellen die Funktion von Ventilen wieder her und achten dabei auf Dichtheit, prazises Arbeiten und sicheren Betrieb nach der Reparatur.",
        points: [
          "Technische Prufung und Diagnose des Bauteils",
          "Auswahl passender Reparatursatze und Teile",
          "Dichtheitsprufung und Kontrolle nach der Regeneration",
          "Vorbereitung fur den weiteren Einsatz im Fahrzeug",
        ],
        imageSrc: "/wft/zawory_pneumatyczne.png",
        imageAlt: "Regeneration pneumatischer Ventile",
      },
      {
        title: "Regeneration von Bremssatteln",
        text: "Wir regenerieren Bremssattel fur Nutzfahrzeuge, um die Lebensdauer der Bauteile zu verlangern und Stillstande im Alltag zu reduzieren.",
        points: [
          "Bewertung des Verschleisses wichtiger Bauteile",
          "Reinigung, Austausch verschlissener Teile und Montage",
          "Wiederherstellung der korrekten Bremsfunktion",
          "Losungen fur den Einsatz in schweren Nutzfahrzeugen",
        ],
        imageSrc: "/wft/zaciski_hamulcowe.png",
        imageAlt: "Regeneration von Bremssatteln",
      },
      {
        title: "Computergestutzte Diagnose",
        text: "Die Diagnose unterstutzt den Reparaturprozess, damit Fehler schneller erkannt und passende Arbeiten gezielter festgelegt werden konnen.",
        points: [
          "Schnellere Erkennung von Fehlern und Abweichungen",
          "Bessere Anpassung des Reparaturumfangs an das Problem",
          "Unterstutzung bei der Bewertung pneumatischer Systeme",
          "Weniger unnotige Kosten und kurzere Ausfallzeiten",
        ],
        imageSrc: "/wft/hero_new.png",
        imageAlt: "Computergestutzte Diagnose",
      },
      {
        title: "Reparatursatze",
        text: "Wir helfen bei der Auswahl passender Reparatursatze fur konkrete Anwendungen und beschleunigen so den Weg von der Diagnose zur wirksamen Reparatur.",
        points: [
          "Auswahl des Satzes fur ein bestimmtes Bauteil",
          "Unterstutzung beim Vergleich verfugbarer Losungen",
          "Bessere Anpassung an reale Einsatzbedingungen",
          "Schnellerer Weg von der Anfrage bis zur Reparatur",
        ],
        imageSrc: "/wft/zestaw_naprawczy.png",
        imageAlt: "Reparatursatze",
      },
    ],
    strengthsTitle: "Was unser Angebot auszeichnet",
    strengths: [
      "Langjahrige Erfahrung in der Fahrzeugpneumatik",
      "Schnelle Bearbeitung",
      "Hohe Servicequalitat",
      "Zusammenarbeit mit bewahrten Marken",
    ],
    ctaTitle: "Brauchen Sie Reparatur, Regeneration oder Diagnose?",
    ctaText:
      "Senden Sie uns Ihre Anfrage und beschreiben Sie Problem, Fahrzeug oder Bauteil. Wir helfen bei der passenden Losung und erstellen ein Angebot.",
  },
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const content = servicesContent[locale];
  const servicesJsonLd = buildBreadcrumbJsonLd([
    { name: messages.header.nav.home, url: localizedAbsoluteUrl(locale) },
    { name: messages.header.nav.services, url: localizedAbsoluteUrl(locale, "/uslugi") },
  ]);

  return (
    <div className="bg-[#f6f6f6] py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <div className="wft-container space-y-8">
        <Reveal delay={90}>
          <ServicesTabs
            sectionLabel={content.offerTitle}
            strengthsTitle={content.strengthsTitle}
            strengths={content.strengths}
            services={content.services}
          />
        </Reveal>

        <Reveal delay={160}>
          <section className="rounded-[24px] bg-white px-6 py-8 shadow-[0_18px_48px_rgba(22,18,14,0.08)] sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="label text-[var(--wft-orange)]">{content.eyebrow}</p>
                <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] text-[#1f1f1f]">
                  {content.ctaTitle}
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-[#5d5852]">{content.ctaText}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={catalogPath(locale)}
                  className="inline-flex h-13 items-center justify-center rounded-[14px] bg-[var(--wft-orange)] px-7 text-sm font-semibold !text-white shadow-[0_16px_32px_rgba(255,90,42,0.22)] transition hover:!text-white hover:bg-[var(--wft-orange-deep)] hover:shadow-[0_18px_36px_rgba(255,90,42,0.28)]"
                >
                  {messages.header.nav.shop}
                </Link>
                <Link
                  href={contactPath(locale)}
                  className="inline-flex h-13 items-center justify-center rounded-[14px] border border-[#e5ddd3] bg-[#f8f5ef] px-7 text-sm font-semibold text-[var(--wft-dark)] transition hover:border-[var(--wft-orange)] hover:bg-white hover:text-[var(--wft-orange)]"
                >
                  {messages.header.nav.contact}
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
