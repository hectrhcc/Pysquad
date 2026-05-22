/**
 * @file components/home/HeroSection.tsx
 * @description Sección Hero de la landing page de PySquad.
 * - Título con gradiente violeta→cyan
 * - Subtítulo con propuesta de valor
 * - CTAs: "Unirse a la Comunidad" + "Ver Próximos Eventos"
 * - Fondo con grid pattern y partículas decorativas
 */

import Link from "next/link";
import { ArrowRight, CalendarDays, Zap } from "lucide-react";
import SnakeGame from "./SnakeGame";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Gradiente radial de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-[90px]" />
      </div>

      {/* Orbs decorativos */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-violet-400 opacity-60 animate-pulse" aria-hidden="true" />
      <div className="absolute top-40 left-16 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-40 animate-pulse" style={{ animationDelay: "1s" }} aria-hidden="true" />
      <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 rounded-full bg-violet-300 opacity-30 animate-pulse" style={{ animationDelay: "2s" }} aria-hidden="true" />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge superior */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-[#a78bfa]">
          <Zap className="h-3.5 w-3.5 fill-[#a78bfa]" />
          Comunidad Tecnológica Independiente
        </div>

        {/* Título principal */}
        <h1
          className="animate-fade-in-up animation-delay-100 mb-6 font-extrabold tracking-tight leading-[1.1]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-blue-500 text-6xl sm:text-7xl lg:text-8xl">Py</span>
          <span className="text-white text-6xl sm:text-7xl lg:text-8xl">Squad</span>
          <br />
          <span className="text-[#f0f4ff] text-2xl sm:text-3xl lg:text-4xl">Promoviendo la experimentación y el</span>
          <br />
          <span className="text-gradient text-3xl sm:text-4xl lg:text-5xl">conocimiento tecnológico</span>
        </h1>

        {/* Subtítulo */}
        <p className="animate-fade-in-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-[#94a3b8] leading-relaxed">
          Una agrupación independiente de apasionados por la tecnología.
          Aprendemos juntos, compartimos conocimiento y construimos conexiones
          reales entre profesionales y entusiastas del ecosistema tech.
        </p>

        {/* Snake Game Visual */}
        <div className="animate-fade-in-up animation-delay-250 mb-12 flex justify-center">
          <div className="max-w-md w-full">
            <SnakeGame />
          </div>
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#"
            id="cta-unirse-hero"
            style={{ padding: '18px 48px' }}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-lg font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_45px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            <Zap className="h-4 w-4" />
            Unirse a la Comunidad
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/eventos"
            id="cta-ver-eventos-hero"
            style={{ padding: '18px 48px' }}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-[#1e293b] bg-white/5 text-lg font-semibold text-[#f0f4ff] hover:bg-white/10 hover:border-violet-500/40 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <CalendarDays className="h-4 w-4 text-[#94a3b8]" />
            Ver Próximos Eventos
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="animate-fade-in-up animation-delay-400 mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: "8+", label: "Miembros" },
            { value: "4", label: "Meetups" },
            { value: "∞", label: "Café ☕" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl font-bold text-gradient"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {value}
              </div>
              <div className="text-sm text-[#475569] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" aria-hidden="true" />
    </section>
  );
}
