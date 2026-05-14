import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { catalogPath, contactPath, getMessages, type Locale } from "@/lib/i18n";

type AboutPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

type AboutContent = {
  eyebrow: string;
  experienceLabel: string;
  title: string;
  lead: string;
  introTitle: string;
  introParagraphs: string[];
  sectionLabels: string[];
  focusTitle: string;
  focusItems: string[];
  reasonsTitle: string;
  reasons: Array<{
    title: string;
    text: string;
  }>;
  ctaTitle: string;
  ctaText: string;
};

const aboutContent: Record<Locale, AboutContent> = {
  pl: {
    eyebrow: "O firmie",
    experienceLabel: "26+ lat",
    title: "doświadczenia w pneumatyce pojazdowej",
    lead:
      "WFT Pneumatyka - Waldemar Balak specjalizuje się w regeneracji i naprawie elementów układów pneumatycznych w samochodach ciężarowych, naczepach oraz autobusach.",
    introTitle: "Kompleksowa obsługa od diagnozy po skuteczną regenerację",
    introParagraphs: [
      "Zajmujemy się kompleksową obsługą układów pneumatycznych w pojazdach użytkowych. Oferujemy profesjonalną regenerację, diagnostykę oraz naprawę podzespołów, dbając o niezawodność i bezpieczeństwo na drodze.",
      "Łączymy praktyczne doświadczenie warsztatowe z koncentracją na jakości wykonania. Każde zlecenie traktujemy indywidualnie, dobierając rozwiązania do rodzaju pojazdu, stanu podzespołu oraz oczekiwań klienta.",
    ],
    sectionLabels: ["Doświadczenie", "Zakres prac", "Jakość"],
    focusTitle: "Na co dzień pracujemy z układami w pojazdach:",
    focusItems: [
      "samochodach ciężarowych",
      "naczepach",
      "autobusach",
      "flotach oraz pojazdach serwisowanych przez warsztaty partnerskie",
    ],
    reasonsTitle: "Dlaczego klienci wybierają WFT Pneumatyka?",
    reasons: [
      {
        title: "Wieloletnia praktyka",
        text: "Szybciej rozpoznajemy źródło usterki i dobieramy rozwiązanie, które sprawdza się w codziennej eksploatacji.",
      },
      {
        title: "Sprawna realizacja",
        text: "Rozumiemy, że przestój pojazdu kosztuje, dlatego stawiamy na krótką ścieżkę diagnozy i konkretne terminy.",
      },
      {
        title: "Dokładność wykonania",
        text: "Regenerację i naprawy prowadzimy z naciskiem na precyzję, powtarzalność oraz bezpieczeństwo dalszej pracy układu.",
      },
      {
        title: "Sprawdzone marki",
        text: "Pracujemy z rozwiązaniami znanych producentów, co ułatwia dobór odpowiednich części i zestawów naprawczych.",
      },
    ],
    ctaTitle: "Szukasz partnera do naprawy lub regeneracji pneumatyki?",
    ctaText:
      "Skontaktuj się z nami, jeśli potrzebujesz szybkiej diagnozy, regeneracji konkretnego podzespołu albo pomocy w doborze odpowiedniego rozwiązania dla pojazdu.",
  },
  en: {
    eyebrow: "About us",
    experienceLabel: "26+ years",
    title: "of experience in vehicle pneumatics",
    lead:
      "WFT Pneumatyka - Waldemar Balak specializes in regeneration and repair of pneumatic system components for trucks, trailers and buses.",
    introTitle: "Comprehensive support from diagnostics to reliable regeneration",
    introParagraphs: [
      "We provide complete service for pneumatic systems in commercial vehicles. Our work includes professional regeneration, diagnostics and repair of key components to ensure reliability and safety on the road.",
      "We combine hands-on workshop experience with a strong focus on quality. Every job is handled individually, with solutions matched to the vehicle type, component condition and customer needs.",
    ],
    sectionLabels: ["Experience", "Scope", "Quality"],
    focusTitle: "We work daily with systems used in:",
    focusItems: [
      "trucks",
      "trailers",
      "buses",
      "fleets and vehicles serviced by partner workshops",
    ],
    reasonsTitle: "Why customers choose WFT Pneumatyka?",
    reasons: [
      {
        title: "Practical experience",
        text: "Long-term work with pneumatic systems helps us identify faults faster and recommend effective repair paths.",
      },
      {
        title: "Fast turnaround",
        text: "We know downtime means real cost, so we focus on efficient diagnostics and realistic lead times.",
      },
      {
        title: "Precision first",
        text: "Our regeneration and repair work is carried out with attention to repeatability, quality and operational safety.",
      },
      {
        title: "Trusted manufacturers",
        text: "We work with proven brands and components, making it easier to select the right parts and repair kits.",
      },
    ],
    ctaTitle: "Need a reliable partner for pneumatic repairs?",
    ctaText:
      "Contact us if you need quick diagnostics, component regeneration or support in choosing the right solution for your vehicle.",
  },
  de: {
    eyebrow: "Über uns",
    experienceLabel: "26+ Jahre",
    title: "Erfahrung mit Fahrzeugpneumatik",
    lead:
      "WFT Pneumatyka - Waldemar Balak ist auf die Regeneration und Reparatur von Bauteilen pneumatischer Systeme für Lkw, Auflieger und Busse spezialisiert.",
    introTitle: "Umfassender Service von der Diagnose bis zur zuverlässigen Regeneration",
    introParagraphs: [
      "Wir betreuen pneumatische Systeme in Nutzfahrzeugen umfassend. Dazu gehören professionelle Regeneration, Diagnose und Reparatur wichtiger Baugruppen für mehr Zuverlässigkeit und Sicherheit im Einsatz.",
      "Wir verbinden praktische Werkstatterfahrung mit einem hohen Qualitätsanspruch. Jede Anfrage wird individuell behandelt und an Fahrzeugtyp, Zustand des Bauteils und Kundenbedarf angepasst.",
    ],
    sectionLabels: ["Erfahrung", "Leistung", "Qualität"],
    focusTitle: "Wir arbeiten täglich mit Systemen in:",
    focusItems: [
      "Lastkraftwagen",
      "Aufliegern",
      "Bussen",
      "Flotten und Fahrzeugen von Partnerwerkstätten",
    ],
    reasonsTitle: "Warum Kunden WFT Pneumatyka wählen",
    reasons: [
      {
        title: "Langjährige Praxis",
        text: "Dank unserer Erfahrung mit pneumatischen Systemen erkennen wir Fehler schneller und empfehlen passende Lösungen.",
      },
      {
        title: "Schnelle Umsetzung",
        text: "Fahrzeugstillstand verursacht Kosten. Deshalb setzen wir auf effiziente Diagnose und klare Bearbeitungszeiten.",
      },
      {
        title: "Sorgfältige Arbeit",
        text: "Bei Regeneration und Reparatur achten wir auf Genauigkeit, Wiederholbarkeit und sichere spätere Nutzung.",
      },
      {
        title: "Starke Marken",
        text: "Wir arbeiten mit bekannten Herstellern und bewährten Lösungen, was die Auswahl passender Teile erleichtert.",
      },
    ],
    ctaTitle: "Suchen Sie einen Partner für Pneumatik-Reparaturen?",
    ctaText:
      "Kontaktieren Sie uns, wenn Sie eine schnelle Diagnose, Regeneration eines Bauteils oder Unterstützung bei der richtigen Lösung für Ihr Fahrzeug brauchen.",
  },
};

function FocusListItem({ item }: { item: string }) {
  return (
    <li className="flex items-start gap-3 text-[16px] leading-7 text-[#4f4a44]">
      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--wft-orange)]" />
      <span>{item}</span>
    </li>
  );
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const content = aboutContent[locale];

  return (
    <div className="bg-[#f6f6f6] py-8 md:py-12">
      <div className="wft-container space-y-8">
        <Reveal>
          <section className="overflow-hidden rounded-[24px] bg-white">
            <div className="grid lg:grid-cols-[1fr_0.94fr] lg:items-center">
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
                <Image
                  src="/wft/hero_new.png"
                  alt={content.eyebrow}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,30,28,0.16)_0%,rgba(33,30,28,0.04)_55%,transparent_100%)]" />
              </div>

              <div className="px-6 py-8 sm:px-10 lg:px-14">
                <h1 className="max-w-[540px] text-[30px] font-light leading-[1.08] text-[#181614] sm:text-[44px]">
                  {content.experienceLabel}{" "}
                  <span className="font-semibold text-[#12110f]">{content.title}</span>
                </h1>
                <div className="mt-6 h-px w-20 bg-[var(--wft-orange)]" />
                <p className="mt-6 max-w-[520px] text-[16px] leading-8 text-[#615a52]">
                  {content.lead}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="rounded-[24px] bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <article className="max-w-4xl">
              <h2 className="max-w-[580px] text-[30px] font-semibold leading-[1.12] text-[#1b1916]">
                {content.introTitle}
              </h2>
              <div className="mt-5 h-px w-16 bg-[var(--wft-orange)]" />

              <div className="mt-6 space-y-5">
                {content.introParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-8 text-[#5d5852]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-2">
                <h3 className="text-[22px] font-semibold leading-[1.2] text-[#1b1916]">
                  {content.focusTitle}
                </h3>
                <ul className="mt-5 space-y-3">
                  {content.focusItems.map((item) => (
                    <FocusListItem key={item} item={item} />
                  ))}
                </ul>
              </div>
            </article>
          </section>
        </Reveal>

        <Reveal delay={140}>
          <section className="rounded-[24px] bg-white px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="max-w-[720px]">
              <h2 className="text-[30px] font-semibold leading-[1.12] text-[#1b1916]">
                {content.reasonsTitle}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.reasons.map((reason) => (
                <div key={reason.title} className="px-1 py-2">
                  <div className="h-1 w-14 bg-[var(--wft-orange)]" />
                  <h3 className="mt-5 text-[22px] font-semibold text-[#1b1916]">{reason.title}</h3>
                  <p className="mt-3 text-[16px] leading-8 text-[#5d5852]">{reason.text}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section className="rounded-[24px] bg-white px-6 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-[30px] font-semibold leading-[1.12] text-[#1b1916]">
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
