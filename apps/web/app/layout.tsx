import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wft-pneumatyka.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    images: [
      {
        url: "/wft/hero_new.png",
        width: 1200,
        height: 630,
        alt: "WFT Pneumatyka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/wft/hero_new.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const activeLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return (
    <html
      lang={activeLocale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[var(--wft-body)] text-[var(--wft-dark)] antialiased">
        {children}
      </body>
    </html>
  );
}
