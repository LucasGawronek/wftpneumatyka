import { getMessages, type Locale } from "@/lib/i18n";

type PrivacyPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const content = messages.pages.privacy;

  return (
    <div className="bg-[#f8f8f8] py-10 md:py-14">
      <div className="wft-container space-y-8">
        <section className="rounded-[24px] bg-white px-6 py-8 shadow-[0_12px_28px_rgba(0,0,0,0.06)] sm:px-8 md:px-10">
          <p className="label text-[var(--wft-orange)]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-[1.15] text-[#1f1f1f] sm:text-[48px]">
            {content.title}
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.08em] text-[#7a7a7a]">
            {content.updated}
          </p>
          <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#5f5f5f]">{content.intro}</p>
        </section>

        <section className="grid gap-6">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[24px] bg-white px-6 py-6 shadow-[0_12px_28px_rgba(0,0,0,0.06)] sm:px-8"
            >
              <h2 className="text-[24px] font-semibold text-[#1f1f1f]">{section.title}</h2>
              <p className="mt-4 text-[15px] leading-8 text-[#5f5f5f]">{section.text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
