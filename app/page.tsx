/**
 * @file app/page.tsx
 * @description Home page de PySquad (Landing).
 * Compone: HeroSection + PillarsSection + FeaturedEvent
 */

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PillarsSection from "@/components/home/PillarsSection";
import FeaturedEvent from "@/components/home/FeaturedEvent";

export const metadata: Metadata = {
  title: "PySquad — Comunidad Tecnológica Independiente",
  description:
    "PySquad es una agrupación independiente de tecnología. Aprende, comparte y conecta con profesionales y entusiastas del ecosistema tech.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <FeaturedEvent />
    </>
  );
}
