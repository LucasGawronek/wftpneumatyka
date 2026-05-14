import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { getMessages, type Locale } from "@/lib/i18n";

type ContactPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

type ContactPageContent = {
  eyebrow: string;
  title: string;
  lead: string;
  detailsTitle: string;
  detailsText: string;
  formTitle: string;
  formText: string;
  form: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    consent: string;
    placeholders: {
      fullName: string;
      email: string;
      phone: string;
      company: string;
      message: string;
    };
    submitIdle: string;
    submitPending: string;
    success: string;
    error: string;
  };
};

const contactContent: Record<Locale, ContactPageContent> = {
  pl: {
    eyebrow: "Kontakt",
    title: "Skontaktuj się z WFT Pneumatyka",
    lead:
      "Napisz do nas, jeśli potrzebujesz diagnozy, regeneracji podzespołu albo pomocy w doborze części do układów pneumatycznych i hamulcowych.",
    detailsTitle: "Dane kontaktowe",
    detailsText:
      "Obsługujemy klientów indywidualnych, warsztaty oraz firmy transportowe. Najszybciej wrócimy z odpowiedzią, jeśli w wiadomości opiszesz pojazd, objawy usterki lub numer części.",
    formTitle: "Formularz kontaktowy",
    formText:
      "Wypełnij formularz, a odezwiemy się tak szybko, jak to możliwe. Jeśli zapytanie dotyczy konkretnej części, możesz dodać numer katalogowy lub opis pojazdu.",
    form: {
      fullName: "Imię i nazwisko",
      email: "Adres e-mail",
      phone: "Telefon",
      company: "Firma",
      message: "Wiadomość",
      consent: "Wyrażam zgodę na kontakt w sprawie przesłanej wiadomości.",
      placeholders: {
        fullName: "Jan Kowalski",
        email: "jan@firma.pl",
        phone: "+48 500 000 000",
        company: "Nazwa firmy",
        message: "Opisz, czego potrzebujesz, jaki pojazd dotyczy zgłoszenia i jakie są objawy usterki.",
      },
      submitIdle: "Wyślij wiadomość",
      submitPending: "Wysyłanie...",
      success: "Wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.",
      error: "Wystąpił błąd podczas wysyłania wiadomości.",
    },
  },
  en: {
    eyebrow: "Contact",
    title: "Get in touch with WFT Pneumatyka",
    lead:
      "Send us a message if you need diagnostics, component regeneration or support in selecting parts for pneumatic and braking systems.",
    detailsTitle: "Contact details",
    detailsText:
      "We support individual customers, workshops and transport companies. The fastest way for us to respond is when your message includes the vehicle, symptoms or part number.",
    formTitle: "Contact form",
    formText:
      "Fill in the form and we will get back to you as soon as possible. If the inquiry concerns a specific part, include the catalog number or vehicle details.",
    form: {
      fullName: "Full name",
      email: "Email address",
      phone: "Phone",
      company: "Company",
      message: "Message",
      consent: "I agree to be contacted regarding this message.",
      placeholders: {
        fullName: "John Smith",
        email: "john@company.com",
        phone: "+48 500 000 000",
        company: "Company name",
        message: "Describe what you need, which vehicle is involved and what symptoms or issue you are seeing.",
      },
      submitIdle: "Send message",
      submitPending: "Sending...",
      success: "Your message has been sent. We will get back to you as soon as possible.",
      error: "An error occurred while sending the message.",
    },
  },
  de: {
    eyebrow: "Kontakt",
    title: "Kontakt mit WFT Pneumatyka",
    lead:
      "Schreiben Sie uns, wenn Sie eine Diagnose, Regeneration eines Bauteils oder Hilfe bei der Auswahl von Teilen für pneumatische und bremstechnische Systeme brauchen.",
    detailsTitle: "Kontaktdaten",
    detailsText:
      "Wir betreuen Privatkunden, Werkstätten und Transportunternehmen. Am schnellsten können wir reagieren, wenn Ihre Nachricht Fahrzeug, Symptome oder Teilenummer enthält.",
    formTitle: "Kontaktformular",
    formText:
      "Füllen Sie das Formular aus und wir melden uns so schnell wie möglich. Wenn es um ein bestimmtes Teil geht, geben Sie bitte die Katalognummer oder Fahrzeuginformationen an.",
    form: {
      fullName: "Vor- und Nachname",
      email: "E-Mail-Adresse",
      phone: "Telefon",
      company: "Firma",
      message: "Nachricht",
      consent: "Ich stimme einer Kontaktaufnahme zu dieser Nachricht zu.",
      placeholders: {
        fullName: "Max Mustermann",
        email: "max@firma.de",
        phone: "+48 500 000 000",
        company: "Firmenname",
        message: "Beschreiben Sie bitte Ihr Anliegen, das Fahrzeug und die Symptome oder den Fehler.",
      },
      submitIdle: "Nachricht senden",
      submitPending: "Wird gesendet...",
      success: "Ihre Nachricht wurde gesendet. Wir melden uns so schnell wie möglich.",
      error: "Beim Senden der Nachricht ist ein Fehler aufgetreten.",
    },
  },
};

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="transition hover:text-[var(--wft-orange)]">
      {value}
    </a>
  ) : (
    value
  );

  return (
    <div className="border-t border-[#ebe2d7] py-5 first:border-t-0 first:pt-0">
      <p className="label text-[#8a8178]">{label}</p>
      <div className="mt-2 text-[19px] font-semibold leading-8 text-[#1b1916]">{content}</div>
    </div>
  );
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const content = contactContent[locale];
  const googleMapBusinessQuery = encodeURIComponent(
    "WFT.Pneumatyka Waldemar Balak Regeneracja zacisków, zaworów, Długa 23, 64-000 Sierakowo",
  );
  const googleMapEmbedUrl = `https://www.google.com/maps?q=${googleMapBusinessQuery}&z=19&output=embed`;

  return (
    <div className="bg-[#f6f6f6] py-8 md:py-12">
      <div className="wft-container space-y-8">
        <Reveal>
          <section className="overflow-hidden rounded-[24px] border border-[#e5ddd3] bg-white">
            <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <p className="label text-[var(--wft-orange)]">{content.eyebrow}</p>
              <h1 className="mt-4 max-w-[680px] text-[34px] font-semibold leading-[1.08] text-[#1b1916] sm:text-[48px]">
                {content.title}
              </h1>
              <p className="mt-5 max-w-[760px] text-[16px] leading-8 text-[#5d5852]">
                {content.lead}
              </p>
              <p className="mt-8 max-w-[760px] text-[16px] leading-8 text-[#5d5852]">
                {content.detailsText}
              </p>

              <div className="mt-8 max-w-[760px]">
                <ContactCard
                  label={messages.common.phone}
                  value={messages.home.contact.phone}
                  href={`tel:${messages.home.contact.phone.replace(/\s+/g, "")}`}
                />
                <ContactCard
                  label={messages.common.email}
                  value={messages.home.contact.email}
                  href={`mailto:${messages.home.contact.email}`}
                />
                <ContactCard label={messages.common.address} value={messages.home.contact.address} />
              </div>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal delay={80}>
            <div className="space-y-8">
              <div className="overflow-hidden rounded-[24px] border border-[#e5ddd3] bg-white">
                <div className="relative aspect-[805/611] min-h-[300px] bg-white">
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

          <Reveal delay={140}>
            <section className="rounded-[24px] border border-[#e5ddd3] bg-white px-6 py-8 sm:px-8 lg:px-10">
              <p className="label text-[var(--wft-orange)]">{content.eyebrow}</p>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.12] text-[#1b1916]">
                {content.formTitle}
              </h2>
              <p className="mt-4 max-w-[720px] text-[16px] leading-8 text-[#5d5852]">
                {content.formText}
              </p>

              <div className="mt-8">
                <ContactForm locale={locale} messages={content.form} />
              </div>
            </section>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
