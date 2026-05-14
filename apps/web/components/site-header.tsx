"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ProductSearch } from "@/components/product-search";
import {
  catalogPath,
  contactPath,
  defaultLocale,
  localizedPath,
  quotePath,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";

const DESKTOP_BREAKPOINT = 1200;
const LOCALE_OPTIONS: Array<{ code: Locale; flagSrc: string; name: string }> = [
  { code: "pl", flagSrc: "/flags/Flag_of_Poland.svg", name: "Polski" },
  { code: "de", flagSrc: "/flags/Flag_of_Germany.svg", name: "Deutsch" },
  { code: "en", flagSrc: "/flags/Flag_of_the_United_Kingdom_(3-5).svg", name: "English" },
];

type SiteHeaderProps = {
  locale: Locale;
  messages: {
    siteTitle: string;
    locales: Record<Locale, string>;
    header: {
      nav: {
        home: string;
        about: string;
        shop: string;
        services: string;
        contact: string;
      };
      openMenu: string;
      closeMenu: string;
      quickContact: string;
      askQuote: string;
    };
    search: {
      fetchError: string;
      label: string;
      placeholder: string;
      button: string;
      minChars: string;
      loading: string;
      noResults: string;
      fallbackProductLabel: string;
    };
  };
};

function PhoneIcon() {
  return (
    <Image
      src="/phone.svg"
      alt=""
      width={18}
      height={18}
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    />
  );
}

function MenuButton({
  isOpen,
  onClick,
  messages,
}: {
  isOpen: boolean;
  onClick: () => void;
  messages: SiteHeaderProps["messages"];
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? messages.header.closeMenu : messages.header.openMenu}
      aria-expanded={isOpen}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-white transition hover:border-[var(--wft-orange)] hover:text-[var(--wft-orange)]"
    >
      <span className="relative block h-4 w-5">
        <span
          className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition ${
            isOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition ${
            isOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

function FlagIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={24}
      height={16}
      unoptimized
      className="h-4 w-6 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.18)]"
    />
  );
}

function LanguageSwitcher({
  locale,
  messages,
  onNavigate,
}: {
  locale: Locale;
  messages: SiteHeaderProps["messages"];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const search = searchParams.toString();
  const currentPath = pathname || localizedPath(defaultLocale);
  const activeLocale =
    LOCALE_OPTIONS.find((option) => option.code === locale) ?? LOCALE_OPTIONS[0];

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath, search]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-10 items-center gap-3 rounded-[10px] border border-white/14 bg-white/10 px-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/14"
      >
        <FlagIcon src={activeLocale.flagSrc} />
        <span>{activeLocale.name}</span>
        <span className="sr-only">{messages.locales[locale]}</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 text-white/80 transition ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        className={`absolute right-0 top-[calc(100%+0.6rem)] z-50 min-w-[180px] overflow-hidden rounded-[14px] border border-white/12 bg-[#171515]/96 p-1.5 shadow-[0_18px_34px_rgba(0,0,0,0.28)] backdrop-blur-md transition ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {LOCALE_OPTIONS.map((option) => {
          const href = `${switchLocalePath(currentPath, option.code)}${search ? `?${search}` : ""}`;
          const isActive = locale === option.code;

          return (
            <Link
              key={option.code}
              href={href}
              role="menuitem"
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-[var(--wft-orange)] text-white"
                  : "text-white/82 hover:bg-white/8 hover:text-white"
              }`}
            >
              <FlagIcon src={option.flagSrc} />
              <span className="flex-1 font-medium">{option.name}</span>
              <span
                className={`text-[11px] font-semibold uppercase ${isActive ? "text-white/80" : "text-white/45"}`}
              >
                {messages.locales[option.code]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState(
    typeof window === "undefined" ? true : window.innerWidth >= DESKTOP_BREAKPOINT,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function syncViewport() {
      const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktopViewport(desktop);

      if (desktop) {
        setIsMobileMenuOpen(false);
      }
    }

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      !isDesktopViewport && isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDesktopViewport, isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const navItems = [
    { href: localizedPath(locale), label: messages.header.nav.home },
    { href: localizedPath(locale, "/o-nas"), label: messages.header.nav.about },
    { href: catalogPath(locale), label: messages.header.nav.shop },
    { href: localizedPath(locale, "/uslugi"), label: messages.header.nav.services },
    { href: contactPath(locale), label: messages.header.nav.contact },
  ];

  return (
    <header className="relative z-40 w-full">
      <div className="bg-[var(--wft-orange)] text-white">
        <div className="wft-container flex items-center justify-between py-3 text-sm font-medium">
          <div className="flex items-center gap-3">
            <PhoneIcon />
            <a
              href="tel:+48663226683"
              className="transition hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[var(--wft-orange)]"
            >
              +48 663 226 683
            </a>
          </div>
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} messages={messages} />
          </div>
        </div>
      </div>

      <div className="bg-[var(--wft-dark)] text-white">
        <div className="wft-container py-5">
          {isDesktopViewport ? (
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <Link href={localizedPath(locale)} className="shrink-0">
                  <Image
                    src="/wft_logo_white.svg"
                    alt={messages.siteTitle}
                    width={170}
                    height={49}
                    priority
                  />
                </Link>

                <nav className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-base font-semibold transition hover:text-[var(--wft-orange)] ${
                        index === 0 ? "text-[var(--wft-orange)]" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="w-full max-w-[430px] shrink-0">
                <ProductSearch locale={locale} messages={messages.search} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-4">
                <Link href={localizedPath(locale)} className="shrink-0" onClick={closeMobileMenu}>
                  <Image
                    src="/wft_logo_white.svg"
                    alt={messages.siteTitle}
                    width={148}
                    height={43}
                    priority
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block">
                    <LanguageSwitcher
                      locale={locale}
                      messages={messages}
                      onNavigate={closeMobileMenu}
                    />
                  </div>
                  <MenuButton
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((current) => !current)}
                    messages={messages}
                  />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
                  isMobileMenuOpen ? "mt-5 max-h-[760px] opacity-100" : "mt-0 max-h-0 opacity-0"
                }`}
              >
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_34px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                  <div className="border-b border-white/10 pb-4">
                    <ProductSearch
                      locale={locale}
                      messages={messages.search}
                      onNavigate={closeMobileMenu}
                    />
                  </div>

                  <div className="mt-4 flex justify-start sm:hidden">
                    <LanguageSwitcher
                      locale={locale}
                      messages={messages}
                      onNavigate={closeMobileMenu}
                    />
                  </div>

                  <nav className="mt-4 grid gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="rounded-[14px] px-4 py-3 text-base font-semibold text-white transition hover:bg-white/8 hover:text-[var(--wft-orange)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-5 rounded-[18px] bg-[var(--wft-orange)]/14 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                      {messages.header.quickContact}
                    </p>
                    <a
                      href="tel:+48663226683"
                      className="mt-2 block text-lg font-semibold text-white transition hover:text-[var(--wft-orange)]"
                    >
                      +48 663 226 683
                    </a>
                    <Link
                      href={quotePath(locale)}
                      onClick={closeMobileMenu}
                      className="mt-4 inline-flex h-11 items-center rounded-[10px] bg-[var(--wft-orange)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--wft-orange-deep)]"
                    >
                      {messages.header.askQuote}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
