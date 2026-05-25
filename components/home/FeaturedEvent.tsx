/**
 * @file components/home/FeaturedEvent.tsx
 * @description Banner del próximo evento destacado de PySquad.
 * - Título, speaker, fecha, hora y categoría
 * - Countdown en días hasta el evento
 * - Borde animado con gradiente
 * - Botón de inscripción
 */

import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getUpcomingEvent } from "@/data/mockData";
import { formatDate, getDaysUntil } from "@/lib/utils";

// ─── Ícono serpiente (Python) ─────────────────────────────────────────────────
function SnakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5V8H12V9H5.5C3.5 9 2 11 2 13.5C2 16 3.5 18 5.5 18H7V16H5.5C4.7 16 4 15.3 4 13.5C4 11.7 4.7 11 5.5 11H12C14.5 11 16.5 9.5 16.5 7.5V5.5C16.5 3.5 14.5 2 12 2ZM9.5 5.5C10.1 5.5 10.5 5.9 10.5 6.5C10.5 7.1 10.1 7.5 9.5 7.5C8.9 7.5 8.5 7.1 8.5 6.5C8.5 5.9 8.9 5.5 9.5 5.5Z" />
      <path d="M12 15H18.5C20.5 15 22 13 22 10.5C22 8 20.5 6 18.5 6H17V8H18.5C19.3 8 20 8.7 20 10.5C20 12.3 19.3 13 18.5 13H12C9.5 13 7.5 14.5 7.5 16.5V18.5C7.5 20.5 9.5 22 12 22C14.5 22 16.5 20.5 16.5 18.5V16H12V15ZM14.5 18.5C14.5 19.1 14.1 19.5 13.5 19.5C12.9 19.5 12.5 19.1 12.5 18.5C12.5 17.9 12.9 17.5 13.5 17.5C14.1 17.5 14.5 17.9 14.5 18.5Z" />
    </svg>
  );
}

// ─── Colores por categoría ────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  AI: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Mobile: "bg-cyan-500/12 text-cyan-300 border-cyan-500/25",
  DevOps: "bg-orange-500/12 text-orange-300 border-orange-500/25",
  Web: "bg-blue-500/12 text-blue-300 border-blue-500/25",
  Backend: "bg-green-500/12 text-green-300 border-green-500/25",
  Frontend: "bg-pink-500/12 text-pink-300 border-pink-500/25",
  General: "bg-slate-500/12 text-slate-300 border-slate-500/25",
};

// ─── Componente ───────────────────────────────────────────────────────────────
export default function FeaturedEvent() {
  const event = getUpcomingEvent();

  if (!event) return null;

  const daysUntil = getDaysUntil(event.date);
  const categoryClass =
    categoryColors[event.category] ?? categoryColors.General;

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8 mb-12"
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '120px', paddingBottom: '120px', backgroundColor: '#080b14', clear: 'both', zIndex: 10 }}
    >
      <div className="w-full max-w-5xl" style={{ margin: '0 auto' }}>
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#06b6d4]">
            Próximo Evento
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#f0f4ff]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            No te lo pierdas
          </h2>
        </div>

        {/* Banner del evento */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Borde animado */}
          <div className="absolute inset-0 rounded-3xl p-px">
            <div className="absolute inset-0 rounded-3xl animated-border opacity-60" />
          </div>

          {/* Contenido del banner */}
          <div className="relative rounded-3xl bg-[#0d1117] border border-violet-500/20 overflow-hidden">
            {/* Gradiente de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/8" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative p-10 sm:p-14 lg:p-20 text-center">
              <div className="flex flex-col items-center justify-center gap-10">
                {/* Info principal */}
                <div className="flex flex-col items-center space-y-6">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold ${categoryClass}`}
                    >
                      <Sparkles className="h-4 w-4" />
                      {event.category}
                    </span>
                    {daysUntil !== null && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-300 animate-pulse-glow">
                        ⏳ En {daysUntil} días
                      </span>
                    )}
                  </div>

                  {/* Título */}
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] leading-tight max-w-3xl"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {event.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-3xl">
                    {event.description}
                  </p>

                  {/* Metadatos */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#94a3b8] pt-4">
                    <div className="flex items-center gap-2.5">
                      <CalendarDays className="h-5 w-5 text-violet-400 flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                        <span>{event.time} hs</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <User className="h-5 w-5 text-violet-400 flex-shrink-0" />
                      <span>
                        <span className="text-[#f0f4ff] font-medium text-base">
                          {event.speaker}
                        </span>
                        {event.speakerRole && (
                          <span className="ml-1 text-[#475569]">
                            — {event.speakerRole}
                          </span>
                        )}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA inferior */}
                <div className="pt-4">
                  <Link
                    href={event.registrationUrl ?? "#"}
                    id="cta-registro-evento"
                    style={{ padding: '18px 48px', backgroundColor: '#3b82f6' }}
                    className="group inline-flex items-center justify-center gap-3 rounded-xl text-lg font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-200 active:scale-95 whitespace-nowrap"
                  >
                    <SnakeIcon className="h-5 w-5" />
                    Inscribirme ahora
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
