import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
