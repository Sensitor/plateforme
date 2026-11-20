import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { CloudSync } from "@/lib/sync/cloud-sync";
import { LOCALES, isLocale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/client";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
/** Display face for headlines: gives Sensitor its editorial, research-house voice. */
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en").meta;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: { default: t.siteTitle, template: "%s · SENSITOR" },
    description: t.siteDescription,
    applicationName: "SENSITOR",
  };
}

export const viewport: Viewport = {
  themeColor: "#101216",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <CloudSync />
            {children}
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
