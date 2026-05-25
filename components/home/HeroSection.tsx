/**
 * @file components/home/HeroSection.tsx
 * @description Sección Hero de la landing page de PySquad.
 * - Título con gradiente bluea→cyan
 * - Subtítulo con propuesta de valor
 * - CTAs: "Unirse a la Comunidad" + "Ver Próximos Eventos"
 * - Fondo con grid pattern y partículas decorativas
 */

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import SnakeGame from "./SnakeGame";

// Ícono serpiente SVG (Python logo snake)
function SnakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5V8H12V9H5.5C3.5 9 2 11 2 13.5C2 16 3.5 18 5.5 18H7V16H5.5C4.7 16 4 15.3 4 13.5C4 11.7 4.7 11 5.5 11H12C14.5 11 16.5 9.5 16.5 7.5V5.5C16.5 3.5 14.5 2 12 2ZM9.5 5.5C10.1 5.5 10.5 5.9 10.5 6.5C10.5 7.1 10.1 7.5 9.5 7.5C8.9 7.5 8.5 7.1 8.5 6.5C8.5 5.9 8.9 5.5 9.5 5.5Z" />
      <path d="M12 15H18.5C20.5 15 22 13 22 10.5C22 8 20.5 6 18.5 6H17V8H18.5C19.3 8 20 8.7 20 10.5C20 12.3 19.3 13 18.5 13H12C9.5 13 7.5 14.5 7.5 16.5V18.5C7.5 20.5 9.5 22 12 22C14.5 22 16.5 20.5 16.5 18.5V16H12V15ZM14.5 18.5C14.5 19.1 14.1 19.5 13.5 19.5C12.9 19.5 12.5 19.1 12.5 18.5C12.5 17.9 12.9 17.5 13.5 17.5C14.1 17.5 14.5 17.9 14.5 18.5Z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Gradiente radial de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/8 blur-[90px]" />
      </div>

      {/* Snake Background Effect */}
      <SnakeGame />

      {/* Orbs decorativos */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-blue-400 opacity-60 animate-pulse" aria-hidden="true" />
      <div className="absolute top-40 left-16 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-40 animate-pulse" style={{ animationDelay: "1s" }} aria-hidden="true" />
      <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 rounded-full bg-blue-300 opacity-30 animate-pulse" style={{ animationDelay: "2s" }} aria-hidden="true" />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge superior */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-[#60a5fa]">
          <SnakeIcon className="h-3.5 w-3.5" />
          Comunidad Tecnológica Independiente
        </div>

        {/* Título principal */}
        <h1
          className="animate-fade-in-up animation-delay-100 mb-6 font-extrabold tracking-tight leading-[1.1]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-blue-500 text-6xl sm:text-7xl lg:text-8xl">Py</span>
          <span style={{ color: '#FFD43B' }} className="text-6xl sm:text-7xl lg:text-8xl">Squad</span>
          <br />
          <span className="text-[#f0f4ff] text-2xl sm:text-3xl lg:text-4xl">Promoviendo la experimentación y el</span>
          <br />
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl">conocimiento tecnológico</span>
        </h1>

        {/* Subtítulo */}
        <p className="animate-fade-in-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-[#94a3b8] leading-relaxed">
          Una agrupación independiente de apasionados por la tecnología.
          Aprendemos juntos, compartimos conocimiento y construimos conexiones
          reales entre profesionales y entusiastas del ecosistema tech.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#"
            id="cta-unirse-hero"
            style={{ padding: '18px 48px', backgroundColor: '#3b82f6' }}
            className="group inline-flex items-center gap-2.5 rounded-xl text-lg font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center hover:shadow-[0_0_45px_rgba(59,130,246,0.7)]"
          >
            <SnakeIcon className="h-5 w-5" />
            Unirse a la Comunidad
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/eventos"
            id="cta-ver-eventos-hero"
            style={{ padding: '18px 48px', borderColor: '#3776AB55' }}
            className="group inline-flex items-center gap-2.5 rounded-xl border bg-white/5 text-lg font-semibold text-[#f0f4ff] hover:bg-[#3776AB]/10 hover:border-[#3776AB]/60 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <CalendarDays className="h-4 w-4 text-[#94a3b8]" />
            Ver Próximos Eventos
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="animate-fade-in-up animation-delay-400 mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: "5+", label: "Miembros" },
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" aria-hidden="true" />
    </section>
  );
}
