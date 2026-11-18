import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { CloudSync } from "@/lib/sync/cloud-sync";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
/** Display face for headlines: gives Sensitor its editorial, research-house voice. */
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: {
    default: "SENSITOR, Digital Asset Intelligence",
    template: "%s · SENSITOR",
  },
  description:
    "Understand the market. Research the projects. Master your knowledge. Independent research, market data and education on digital assets.",
  applicationName: "SENSITOR",
};

export const viewport: Viewport = {
  themeColor: "#101216",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AuthProvider>
          <CloudSync />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
