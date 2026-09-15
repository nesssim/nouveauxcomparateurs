import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { MobileNav } from "@/components/layout/MobileNav";

const quicksand = localFont({
  variable: "--font-quicksand",
  src: [
    { path: "../public/fonts/Quicksand-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Quicksand-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Quicksand-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const nunitoSans = localFont({
  variable: "--font-nunito-sans",
  src: "../public/fonts/NunitoSans-Regular.woff2",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.slogan}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${quicksand.variable} ${nunitoSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <MobileNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
