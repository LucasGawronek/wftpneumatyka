"use client";

import Image from "next/image";
import { useState } from "react";

type ServiceTab = {
  title: string;
  text: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
};

type ServicesTabsProps = {
  sectionLabel: string;
  strengthsTitle: string;
  strengths: string[];
  services: ServiceTab[];
};

export function ServicesTabs({
  sectionLabel,
  strengthsTitle,
  strengths,
  services,
}: ServicesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] ?? services[0];

  if (!activeService) {
    return null;
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
      <aside className="space-y-3">
        {services.map((service, index) => (
          <button
            key={service.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`block w-full cursor-pointer rounded-[18px] px-5 py-4 text-left text-[15px] transition ${
              index === activeIndex
                ? "bg-[var(--wft-orange)] text-white shadow-[0_16px_36px_rgba(226,108,31,0.24)]"
                : "bg-white text-[#2a2622] hover:bg-[#fff2e8] hover:text-[var(--wft-orange)]"
            }`}
          >
            {service.title}
          </button>
        ))}

        <div className="rounded-[24px] bg-[var(--wft-dark)] px-5 py-6 text-white shadow-[0_18px_44px_rgba(20,18,16,0.18)]">
          <p className="label text-white/60">{strengthsTitle}</p>
          <ul className="mt-5 space-y-3">
            {strengths.map((strength) => (
              <li key={strength} className="text-[15px] leading-7 text-white/88">
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="rounded-[24px] bg-white px-6 py-8 shadow-[0_18px_48px_rgba(22,18,14,0.08)] sm:px-8 lg:px-10">
        <p className="label text-[var(--wft-orange)]">{sectionLabel}</p>
        <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] text-[#1b1916]">
          {activeService.title}
        </h2>
        <div className="mt-5 h-px w-16 bg-[var(--wft-orange)]" />
        <p className="mt-6 max-w-[760px] text-[16px] leading-8 text-[#5d5852]">{activeService.text}</p>

        <div className="mt-8 overflow-hidden rounded-[22px] bg-[#faf7f2]">
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image
              src={activeService.imageSrc}
              alt={activeService.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {activeService.points.map((point) => (
            <div key={point} className="flex items-start gap-3 pt-4">
              <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[var(--wft-orange)]" />
              <p className="text-[15px] leading-7 text-[#5d5852]">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
