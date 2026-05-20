/**
 * @file app/layout.tsx
 * @description Root layout de PySquad. Configura fuentes, metadata SEO global,
 * y los componentes de layout compartidos (Header, Footer).
 */

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── Fuentes ─────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// ─── Metadata SEO ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "PySquad — Comunidad Tecnológica Independiente",
    template: "%s | PySquad",
  },
  description:
    "PySquad es una agrupación independiente de tecnología. Compartimos conocimiento, aprendemos juntos y conectamos a profesionales y entusiastas del ecosistema tech.",
  keywords: [
    "PySquad",
    "comunidad tecnológica",
    "meetup tecnología",
    "desarrolladores",
    "open source",
    "programación",
  ],
  authors: [{ name: "PySquad Community" }],
  creator: "PySquad",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "PySquad",
    title: "PySquad — Comunidad Tecnológica Independiente",
    description:
      "Aprende, comparte y conecta con la comunidad PySquad. Meetups, workshops y recursos para desarrolladores.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PySquad — Comunidad Tecnológica Independiente",
    description:
      "Aprende, comparte y conecta con la comunidad PySquad.",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
